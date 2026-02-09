console.log("Test 1: Basic console.log works");

try {
    console.log("Test 2: Try-catch works");
    
    const { GoogleGenerativeAI } = require("@google/generative-ai");
    console.log("Test 3: Module loaded");
    
    const API_KEY = "AIzaSyAZix7V2JsDGGFO3OZBajK2xQr3NFfMas0";
    console.log("Test 4: API Key set");
    
    const genAI = new GoogleGenerativeAI(API_KEY);
    console.log("Test 5: GoogleGenerativeAI created");
    
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    console.log("Test 6: Model created");
    
    console.log("Test 7: About to call generateContent");
    
    model.generateContent("Say hello").then(result => {
        console.log("Test 8: Promise resolved");
        console.log("Result:", result);
        process.exit(0);
    }).catch(error => {
        console.log("Test 9: Promise rejected");
        console.log("Error:", error.message);
        process.exit(1);
    });
    
    console.log("Test 10: After generateContent call");
    
} catch (error) {
    console.log("CAUGHT ERROR:", error.message);
    console.log(error);
}

console.log("Test 11: End of file");