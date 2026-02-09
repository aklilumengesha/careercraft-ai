"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

async function callGeminiAPI(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const models = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro"];
  let lastError = null;

  for (const modelName of models) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
          return data.candidates[0].content.parts[0].text;
        }
      }
      
      const errorData = await response.json();
      lastError = new Error(errorData.error?.message || `${modelName} failed`);
    } catch (error) {
      lastError = error;
      continue;
    }
  }

  throw lastError || new Error("All models failed");
}

export async function generateQuiz() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: { industry: true, skills: true },
  });

  if (!user) throw new Error("User not found");

  const prompt = `Generate 10 technical interview questions for a ${user.industry} professional${
    user.skills?.length ? ` with expertise in ${user.skills.join(", ")}` : ""
  }. Each question should be multiple choice with 4 options. Return ONLY valid JSON: {"questions": [{"question": "string", "options": ["s1", "s2", "s3", "s4"], "correctAnswer": "string", "explanation": "string"}]}`;

  try {
    const text = await callGeminiAPI(prompt);
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
    const quiz = JSON.parse(cleanedText);
    if (!quiz.questions || !Array.isArray(quiz.questions)) throw new Error("Invalid quiz format");
    return quiz.questions;
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw new Error(`Failed to generate quiz: ${error.message}`);
  }
}

export async function saveQuizResult(questions, answers, score) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({ where: { clerkUserId: userId } });
  if (!user) throw new Error("User not found");

  const questionResults = questions.map((q, index) => ({
    question: q.question,
    answer: q.correctAnswer,
    userAnswer: answers[index],
    isCorrect: q.correctAnswer === answers[index],
    explanation: q.explanation,
  }));

  const wrongAnswers = questionResults.filter((q) => !q.isCorrect);
  let improvementTip = null;

  if (wrongAnswers.length > 0) {
    const wrongQuestionsText = wrongAnswers.map((q) => 
      `Question: "${q.question}"\nCorrect: "${q.answer}"\nUser: "${q.userAnswer}"`
    ).join("\n\n");

    const improvementPrompt = `The user got these ${user.industry} questions wrong:\n${wrongQuestionsText}\n\nProvide a concise improvement tip (under 2 sentences, encouraging).`;

    try {
      improvementTip = await callGeminiAPI(improvementPrompt);
    } catch (error) {
      improvementTip = "Keep practicing and reviewing the concepts you found challenging.";
    }
  }

  try {
    const assessment = await db.assessment.create({
      data: {
        userId: user.id,
        quizScore: score,
        questions: questionResults,
        category: "Technical",
        improvementTip,
      },
    });
    return assessment;
  } catch (error) {
    console.error("Error saving quiz result:", error);
    throw new Error("Failed to save quiz result");
  }
}

export async function getAssessments() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({ where: { clerkUserId: userId } });
  if (!user) throw new Error("User not found");

  try {
    return await db.assessment.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching assessments:", error);
    throw new Error("Failed to fetch assessments");
  }
}

export async function createInterview(data) {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  try {
    let user = await db.user.findUnique({ where: { clerkUserId: userId } });

    if (!user) {
      const { currentUser } = await import("@clerk/nextjs/server");
      const clerkUser = await currentUser();
      if (!clerkUser) return { success: false, error: "User not found" };

      user = await db.user.create({
        data: {
          clerkUserId: userId,
          name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || "User",
          email: clerkUser.emailAddresses[0].emailAddress,
          imageUrl: clerkUser.imageUrl || "",
        },
      });
    }

    const prompt = `Generate exactly 5 interview questions for a ${data.jobTitle} position in ${data.industry}. Experience: ${data.experience} years. ${data.jobDescription ? `Job: ${data.jobDescription}` : ""} Return ONLY JSON array: ["q1", "q2", "q3", "q4", "q5"]`;

    const text = await callGeminiAPI(prompt);
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
    const questions = JSON.parse(cleanedText);

    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error("Invalid questions format");
    }

    const interview = await db.interview.create({
      data: {
        jobTitle: data.jobTitle,
        industry: data.industry,
        experience: parseInt(data.experience),
        questions,
        status: "in_progress",
        userId: user.id,
      },
    });

    return { success: true, data: interview };
  } catch (error) {
    console.error("Error creating interview:", error);
    return { success: false, error: error.message || "Failed to create interview session" };
  }
}

export async function getInterviewById(id) {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  try {
    const user = await db.user.findUnique({ where: { clerkUserId: userId } });
    if (!user) return { success: false, error: "User not found" };

    const interview = await db.interview.findUnique({
      where: { id, userId: user.id },
    });

    if (!interview) return { success: false, error: "Interview not found" };
    return { success: true, data: interview };
  } catch (error) {
    console.error("Error fetching interview:", error);
    return { success: false, error: "Failed to fetch interview" };
  }
}

export async function answerQuestion({ interviewId, questionIndex, answer }) {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  try {
    const user = await db.user.findUnique({ where: { clerkUserId: userId } });
    if (!user) return { success: false, error: "User not found" };

    const interview = await db.interview.findUnique({
      where: { id: interviewId, userId: user.id },
    });

    if (!interview) return { success: false, error: "Interview not found" };

    const question = interview.questions[questionIndex];
    const prompt = `As an interview coach, provide feedback on this answer:\n\nQuestion: ${question}\nAnswer: ${answer}\n\nProvide: 1) What was good 2) What to improve 3) Better answer (max 150 words)`;

    const feedback = await callGeminiAPI(prompt);
    return { success: true, feedback };
  } catch (error) {
    console.error("Error processing answer:", error);
    return { success: false, error: error.message || "Failed to process answer" };
  }
}