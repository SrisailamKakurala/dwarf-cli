const fetchConfig = require("./fetchConfig");
const OpenAI = require("openai");
const { reactPrompt } = require("../../prompts/react.prompt");

/**
 * Initializes OpenAI instance dynamically with API key from GitHub Releases.
 * @returns {Promise<OpenAI>} The OpenAI instance.
 */
async function getOpenAIInstance() {
  try {
    const config = await fetchConfig();

    if (!config.apiKey) {
      throw new Error("❌ Missing API Key: Please check if 'config.json' is properly fetched.");
    }

    return new OpenAI({ apiKey: config.apiKey });
  } catch (error) {
    console.error("❌ OpenAI Initialization Error:", error);
    throw error; // Propagate error if API key is missing
  }
}

/**
 * Generates project structure based on user input.
 * @param {string} projectGoal - The project goal provided by the user.
 * @param {string} techStack - The tech stack for the project.
 * @returns {Promise<string|null>} AI-generated project structure.
 */
async function generateCode(projectGoal, techStack) {
  try {
    const openai = await getOpenAIInstance();

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful AI that generates project structures based on user input." },
        { role: "user", content: `${reactPrompt} + ${projectGoal}.` },
      ],
    });

    return response.choices[0]?.message?.content || null;
  } catch (error) {
    console.error("❌ AI Service Error:", error);
    return null;
  }
}

module.exports = { generateCode };
