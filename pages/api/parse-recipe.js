import OpenAI from 'openai';
const pdf = require('pdf-parse'); // Specific import for Next.js compatibility

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const config = {
  api: {
    bodyParser: false, // Disabling bodyParser to handle raw binary data (PDF)
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    // 1. Get the PDF data from the request
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    // 2. Extract text from the PDF
    const pdfData = await pdf(buffer);
    const extractedText = pdfData.text;

    // 3. Send to OpenAI for structured parsing
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Cost-effective for text extraction
      messages: [
        { 
          role: "system", 
          content: "Extract recipe data from the text. Return ONLY JSON with keys: title, ingredients (array), instructions (array), prepTime, and servings." 
        },
        { role: "user", content: extractedText }
      ],
      response_format: { type: "json_object" }
    });

    const recipe = JSON.parse(response.choices[0].message.content);
    return res.status(200).json(recipe);

  } catch (error) {
    console.error('Extraction Error:', error);
    return res.status(500).json({ error: 'Failed to parse PDF' });
  }
}
