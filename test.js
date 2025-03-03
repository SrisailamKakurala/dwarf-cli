const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: "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",
});

const completion = openai.chat.completions.create({
  model: "gpt-4o-mini",
  store: true,
  messages: [
    {"role": "user", "content": "write a haiku about ai"},
  ],
});

completion.then((result) => console.log(result.choices[0].message.content));