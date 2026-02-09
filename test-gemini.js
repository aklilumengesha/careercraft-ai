// Test script to verify Gemini API
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config({ path: ".env.local" });

async function testGemini() {
  console.log("Testing Gemini API...");
  console.log("API Key:", process.env.GEMINI_API_KEY ? "Found" : "Missing");

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // List all available models
    console.log("\n📋 Listing available models...\n");
    
    try {
      const models = await genAI.listModels();
      console.log("Available models:");
      for await (const model of models) {
        console.log(`- ${model.name}`);
        console.log(`  Display Name: ${model.displayName}`);
        console.log(`  Supported Methods: ${model.supportedGenerationMethods.join(", ")}`);
        console.log("");
      }
    } catch (listError) {
      console.log("❌ Could not list models:", listError.message);
    }

    // Try using the base model name without version
    console.log("\n🧪 Testing direct API call...\n");
    
    const testModels = [
      "models/gemini-pro",
      "models/gemini-1.5-pro", 
      "models/gemini-1.5-flash",
      "gemini-pro",
      "gemini-1.5-pro",
      "gemini-1.5-flash"
    ];
    
    for (const modelName of testModels) {
      try {
        console.log(`Trying: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Say hello in one word");
        const response = await result.response;
        const text = response.text();
        console.log(`✅ SUCCESS with ${modelName}!`);
        console.log(`Response: ${text}`);
        console.log("\n🎉 Use this model name in your code!\n");
        break;
      } catch (error) {
        console.log(`❌ Failed: ${error.message.substring(0, 100)}...`);
      }
    }
  } catch (error) {
    console.error("Main Error:", error.message);
  }
}

testGemini();