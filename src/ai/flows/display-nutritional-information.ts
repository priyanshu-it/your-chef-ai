'use server';
/**
 * @fileOverview Flow to display nutritional information for a given recipe.
 *
 * - getNutritionalInformation - A function that retrieves and formats nutritional information.
 * - NutritionalInformationInput - The input type for the getNutritionalInformation function.
 * - NutritionalInformationOutput - The return type for the getNutritionalInformation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NutritionalInformationInputSchema = z.object({
  recipeName: z.string().describe('The name of the recipe to get nutritional information for.'),
});

export type NutritionalInformationInput = z.infer<typeof NutritionalInformationInputSchema>;

const NutritionalInformationOutputSchema = z.object({
  calories: z.string().describe('The calorie count of the recipe.'),
  protein: z.string().describe('The protein content of the recipe.'),
  carbs: z.string().describe('The carbohydrate content of the recipe.'),
  fats: z.string().describe('The fat content of the recipe.'),
});

export type NutritionalInformationOutput = z.infer<typeof NutritionalInformationOutputSchema>;

export async function getNutritionalInformation(input: NutritionalInformationInput): Promise<NutritionalInformationOutput> {
  return getNutritionalInformationFlow(input);
}

const getNutritionalInformationPrompt = ai.definePrompt({
  name: 'getNutritionalInformationPrompt',
  input: {schema: NutritionalInformationInputSchema},
  output: {schema: NutritionalInformationOutputSchema},
  prompt: `You are a nutritional expert. Extract the calories, protein, carbs, and fats from the recipe called {{{recipeName}}}. Return the information in a JSON format.
`,
});

const getNutritionalInformationFlow = ai.defineFlow(
  {
    name: 'getNutritionalInformationFlow',
    inputSchema: NutritionalInformationInputSchema,
    outputSchema: NutritionalInformationOutputSchema,
  },
  async input => {
    const {output} = await getNutritionalInformationPrompt(input);
    return output!;
  }
);
