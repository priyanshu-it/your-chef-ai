import dotenv from 'dotenv';
import path from 'path';
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

dotenv.config({ path: path.resolve(__dirname, '../lib/.env') });

export const ai = genkit({
  plugins: [ googleAI({ apiKey: process.env.ICONS_DEMO, }), ],
  model: 'googleai/gemini-2.5-flash',
});
