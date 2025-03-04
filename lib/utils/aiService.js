const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

async function generateCode(projectGoal, techStack) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful AI that generates project structures based on user input." },
        { role: "user", content: `Generate a project structure for a ${techStack} project that is meant for ${projectGoal}.` }
      ],
    });

    console.log(response.choices[0].message.content);

    return response.choices[0].message.content; // Return the AI-generated response
  } catch (error) {
    console.error("❌ AI Service Error:", error);
    return null; // Handle errors gracefully
  }
}

module.exports = { generateCode };
