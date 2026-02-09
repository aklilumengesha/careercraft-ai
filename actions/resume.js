"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";

// Initialize Gemini with error handling
let model;
try {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  model = genAI.getGenerativeModel({ model: "gemini-pro" });
} catch (error) {
  console.error("Failed to initialize Gemini:", error);
}

export async function saveResume(content) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const resume = await db.resume.upsert({
      where: {
        userId: user.id,
      },
      update: {
        content,
      },
      create: {
        userId: user.id,
        content,
      },
    });

    revalidatePath("/resume");
    return resume;
  } catch (error) {
    console.error("Error saving resume:", error.message);
    throw new Error("Failed to save resume");
  }
}

export async function getResume() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return await db.resume.findUnique({
    where: {
      userId: user.id,
    },
  });
}

export async function improveWithAI({ current, type }) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      industryInsight: true,
    },
  });

  if (!user) throw new Error("User not found");

  const prompt = `
    As an expert resume writer, improve the following ${type} description for a ${user.industry} professional.
    Make it more impactful, quantifiable, and aligned with industry standards.
    Current content: "${current}"

    Requirements:
    1. Use action verbs
    2. Include metrics and results where possible
    3. Highlight relevant technical skills
    4. Keep it concise but detailed
    5. Focus on achievements over responsibilities
    6. Use industry-specific keywords
    
    Format the response as a single paragraph without any additional text or explanations.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const improvedContent = response.text().trim();
    return improvedContent;
  } catch (error) {
    console.error("Error improving content:", error);
    throw new Error("Failed to improve content");
  }
}

export async function createResume(data) {
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    // Find or create user
    let user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      // Create user if doesn't exist
      const { currentUser } = await import("@clerk/nextjs/server");
      const clerkUser = await currentUser();
      
      if (!clerkUser) {
        return { success: false, error: "User not found" };
      }

      user = await db.user.create({
        data: {
          clerkUserId: userId,
          name: `${clerkUser.firstName} ${clerkUser.lastName}`,
          email: clerkUser.emailAddresses[0].emailAddress,
          imageUrl: clerkUser.imageUrl,
        },
      });
    }

    const prompt = `
      Create an ATS-optimized resume for a ${data.jobTitle} position in the ${data.industry} industry.
      
      Candidate Details:
      - Years of Experience: ${data.experience}
      - Key Skills: ${data.skills}
      ${data.jobDescription ? `\nJob Description:\n${data.jobDescription}` : ""}
      
      Requirements:
      1. Use a professional format
      2. Include relevant sections (Summary, Experience, Skills, Education)
      3. Use action verbs and quantifiable achievements
      4. Optimize for ATS systems
      5. Tailor content to the job description if provided
      6. Keep it concise and impactful
      
      Format the resume professionally with clear sections.
    `;

    let content;
    try {
      if (!model) {
        throw new Error("AI model not initialized");
      }
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      content = response.text().trim();
      
      if (!content) {
        throw new Error("AI generated empty response");
      }
    } catch (aiError) {
      console.error("AI Generation Error:", aiError.message);
      
      // Fallback: Create a professional resume template
      content = `# ${data.title}

## Professional Summary
Experienced ${data.jobTitle} professional with ${data.experience} years of expertise in the ${data.industry} industry. Proven track record of delivering high-quality results and driving business success.

## Core Competencies
${data.skills}

## Professional Experience

### ${data.jobTitle}
**Company Name** | 20XX - Present
- Led cross-functional teams to achieve project objectives and exceed performance targets
- Implemented innovative solutions that improved efficiency by 30%
- Collaborated with stakeholders to define requirements and deliver results
- Managed multiple projects simultaneously while maintaining high quality standards

### Previous Role
**Previous Company** | 20XX - 20XX
- Developed and executed strategies that increased productivity
- Mentored junior team members and fostered professional development
- Contributed to company growth through dedicated performance

## Education

### Bachelor's Degree in [Field]
**University Name** | Year

## Technical Skills
${data.skills.split(',').map(s => `- ${s.trim()}`).join('\n')}

## Certifications
- Relevant Certification 1
- Relevant Certification 2

---
*Note: This is a template resume. Please customize with your actual experience and achievements.*
      `.trim();
    }

    const resume = await db.resume.upsert({
      where: {
        userId: user.id,
      },
      update: {
        content,
      },
      create: {
        content,
        userId: user.id,
      },
    });

    return { success: true, data: resume };
  } catch (error) {
    console.error("Error creating resume:", error);
    return { success: false, error: "Failed to generate resume" };
  }
}

export async function getResumeById(id) {
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    const resume = await db.resume.findUnique({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!resume) {
      return { success: false, error: "Resume not found" };
    }

    return { success: true, data: resume };
  } catch (error) {
    console.error("Error fetching resume:", error);
    return { success: false, error: "Failed to fetch resume" };
  }
}
