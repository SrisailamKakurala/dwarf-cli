const {
  GoogleGenerativeAI
} = require("@google/generative-ai");
require("dotenv").config();
const { reactPrompt } = require("../../prompts/react.prompt");
const { expressPrompt } = require("../../prompts/express.prompt");
const { nextPrompt } = require("../../prompts/next.prompt");
const { htmlPrompt } = require("../../prompts/htmlcssjs.prompt");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction:
    "You are DWARF! – an advanced AI code assistant built by Srisailam Kakurala.\n\nYour task is to generate full **production-ready** projects with all functionalities.",
});

const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 0,
  maxOutputTokens: 10000,  // Reduced to a more manageable size
  responseMimeType: "application/json",  // Changed to JSON since you're expecting JSON responses
  candidateCount: 1,
  stopSequences: ["```"],
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

    let prompt;
    if (techStack == "ReactJS") {
      prompt = reactPrompt;
    } else if (techStack == "Node.js + Express") {
      prompt = expressPrompt;
    } else if (techStack == "Next.js") {
      prompt = nextPrompt;
    } else if (techStack == "HTML + CSS + JS") {
      prompt = htmlPrompt;
    } else {
      console.error("❌ Invalid tech stack provided.");
      return null
    }

    const result = await chatSession.sendMessage(`${prompt} ${projectGoal}`);
    
    let responseText = result.response.text();
    responseText = responseText.replace(/^```json\s*/, "").replace(/```$/, "");

    return responseText;
  } catch (error) {
    console.error("❌ AI Service Error:", error);
    return null;
  }
}

module.exports = { generateCode };
