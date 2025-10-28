import genkit, { googleAI } from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [
    googleAI(),
    googleAI({ apiKey: process.env.ICONS_DEMO })
  ],
  model: 'googleai/gemini-2.5-flash',
});