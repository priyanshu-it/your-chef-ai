import genkit, { googleAI } from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [
    googleAI(), // default plugin
    googleAI({ apiKey: process.env.ICONS_DEMO }) // plugin with API key
  ],
  model: 'googleai/gemini-2.5-flash',
});

// Example usage
export async function generateText(prompt) {
  try {
    const response = await ai.generate(prompt);
    return response.text;
  } catch (err) {
    console.error('AI generation error:', err);
    throw err;
  }
}
