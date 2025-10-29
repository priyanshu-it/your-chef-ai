import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import { ICONS_DEMO} from '../lib/.env';

export const ai = genkit({
  plugins: [googleAI({apiKey: process.env.ICONS_DEMO})],
  model: 'googleai/gemini-2.5-flash',
});

