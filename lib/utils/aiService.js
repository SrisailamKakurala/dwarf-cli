const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
require("dotenv").config();
const { reactPrompt } = require("../../prompts/react.prompt");
const { expressPrompt } = require("../../prompts/express.prompt");

// const apiKey = process.env.GEMINI_API_KEY;
const apiKey = "AIzaSyDS_ZYKbABqVp88Zj7wgvf7DLqurluHC24";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction:
    "You are DWARF! – an advanced AI code assistant built by Srisailam Kakurala.\n\nYour task is to generate full **production-ready** projects with all functionalities.",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,  // Reduced to a more manageable size
  responseMimeType: "application/json",  // Changed to JSON since you're expecting JSON responses
  candidateCount: 1,
  stopSequences: ["</code>", "```"],
};

/**
 * Generates project structure based on user input using Gemini AI.
 * @param {string} projectGoal - The project goal provided by the user.
 * @param {string} techStack - The tech stack for the project.
 * @returns {Promise<string|null>} AI-generated project structure.
 */
async function generateCode(projectGoal, techStack) {
  try {
    const chatSession = await model.startChat({
      generationConfig,
    });

    const result = await chatSession.sendMessage(`${techStack == "ReactJs" ? reactPrompt : expressPrompt} ${projectGoal}`);
    
    let responseText = result.response.text();
    responseText = responseText.replace(/^```json\s*/, "").replace(/```$/, "");

    return responseText;
  } catch (error) {
    console.error("❌ AI Service Error:", error);
    return null;
  }
}

module.exports = { generateCode };
