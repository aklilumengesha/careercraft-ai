console.log("=== TEST START ===");

const { GoogleGenerativeAI } = require("@google/generative-ai");

console.log("SDK imported successfully");

const API_KEY = "AIzaSyAZix7V2JsDGGFO3OZBajK2xQr3NFfMas0";

console.log("API Key:", API_KEY.substring(0, 20) + "...");

const genAI = new GoogleGenerativeAI(API_KEY);

console.log("GoogleGenerativeAI initialized");

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

console.log("Model created");

// Test the generation
model.generateContent("Say hello")
  .then(result => {
    console.log("✅ SUCCESS!");
    return result.response;
  })
  .then(response => {
    console.log("Response:", response.text());
  })
  .catch(error => {
    console.log("❌ ERROR:", error.message);
    console.log("Full error:", error);
  });

console.log("=== TEST END ===");