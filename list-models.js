// List available Gemini models
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config({ path: ".env.local" });

async function listModels() {
  console.log("Listing available Gemini models...\n");
  
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const models = await genAI.listModels();
    
    console.log("Available models:");
    for (const model of models) {
      console.log(`- ${model.name}`);
      console.log(`  Display Name: ${model.displayName}`);
      console.log(`  Supported methods: ${model.supportedGenerationMethods.join(", ")}`);
      console.log("");
    }
  } catch (error) {
    console.error("Error listing models:");
    console.error(error.message);
    console.log("\n❌ This usually means:");
    console.log("1. Your API key is invalid");
    console.log("2. The Generative Language API is not enabled");
    console.log("3. You need to create a new API key\n");
    console.log("📝 Solution:");
    console.log("1. Go to: https://aistudio.google.com/apikey");
    console.log("2. Click 'Create API key'");
    console.log("3. Copy the new key");
    console.log("4. Update .env.local file");
    console.log("5. Restart the server");
  }
}

listModels();
