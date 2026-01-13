import OpenAI from 'openai';

// This specific syntax avoids both the "not a function" runtime error 
// and the "require is forbidden" build error.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdf = require('pdf-parse');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const chunks = [];
    for await (const chunk of req) { chunks.push(chunk); }
    const buffer = Buffer.concat(chunks);

    // Call the required module directly
    const pdfData = await pdf(buffer);
    const extractedText = pdfData.text;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { 
          role: "system", 
          content: "Return ONLY JSON with keys: title, ingredients (array), instructions (array), prepTime." 
        },
        { role: "user", content: extractedText }
      ],
      response_format: { type: "json_object" }
    });

    return res.status(200).json(JSON.parse(response.choices[0].message.content));
  } catch (_error) {
    console.error('Extraction Error:', _error);
    return res.status(500).json({ error: 'Failed to parse PDF' });
  }
}
