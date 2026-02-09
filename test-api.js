const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config({ path: ".env.local" });

async function testAPI() {
  console.log("=== Starting Gemini API Test ===\n");
  
  const API_KEY = process.env.GEMINI_API_KEY;
  
  console.log("🔑 API Key:", API_KEY ? `Found (${API_KEY.substring(0, 10)}...)` : "Missing");
  
  if (!API_KEY) {
    console.log("❌ No API key found!");
    return;
  }
  
  console.log("");

  // Test 1: Direct fetch with v1beta
  console.log("📡 Test 1: Direct API call with v1beta...\n");
  
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;
    
    console.log("Making request to:", url.substring(0, 80) + "...");
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: 'Say hello' }]
        }]
      })
    });
    
    console.log("Status:", response.status, response.statusText);
    
    const data = await response.json();
    
    if (response.ok) {
      console.log("✅ v1beta API WORKS!");
      console.log("Response:", data.candidates[0].content.parts[0].text);
      console.log("");
    } else {
      console.log("❌ v1beta failed");
      console.log("Error:", JSON.stringify(data, null, 2));
      console.log("");
    }
  } catch (error) {
    console.log("❌ Fetch error:", error.message);
    console.log("Stack:", error.stack);
    console.log("");
  }

  // Test 2: Using SDK
  console.log("📦 Test 2: Using @google/generative-ai SDK...\n");
  
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    console.log("SDK initialized");
    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-pro",
    });
    console.log("Model created");
    
    const result = await model.generateContent("Say hello");
    console.log("Content generated");
    
    const response = await result.response;
    const text = response.text();
    
    console.log("✅ SDK WORKS!");
    console.log("Response:", text);
    console.log("");
  } catch (error) {
    console.log("❌ SDK error:", error.message);
    console.log("Stack:", error.stack);
    console.log("");
  }
  
  console.log("=== Test Complete ===");
}

// Run the test and catch any unhandled errors
testAPI().catch(error => {
  console.error("Unhandled error:", error);
  process.exit(1);
});