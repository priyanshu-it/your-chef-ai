import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import 'dotenv/config'; // loads .env automatically

export const ai = genkit({
  plugins: [googleAI({ apiKey: process.env.ICONS_DEMO })],
  model: 'googleai/gemini-2.5-flash',
});
