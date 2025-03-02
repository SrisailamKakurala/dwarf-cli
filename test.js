const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({ apiKey: process.env.API_KEY });

async function completion () {
    const res = await openai.chat.completions.create({
        model: "gpt-4.5-preview",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
                role: "user",
                content: "Write a haiku about recursion in programming.",
            },
        ],
        store: true,
    });

    return res;
}

completion().then(response => {
    console.log(response);
}).catch(error => {
    console.error("Error:", error);
});