'use server';

/**
 * @fileOverview Generates a ranked list of recipes based on the ingredients provided by the user.
 *
 * - generateRecipesFromIngredients - A function that handles the recipe generation process.
 * - GenerateRecipesInput - The input type for the generateRecipesFromIngredients function.
 * - GenerateRecipesOutput - The return type for the generateRecipesFromIngredients function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRecipesInputSchema = z.object({
  ingredients: z
    .string()
    .describe('A comma-separated list of ingredients the user has available.'),
});
export type GenerateRecipesInput = z.infer<typeof GenerateRecipesInputSchema>;

const RecipeSchema = z.object({
  name: z.string().describe('The name of the recipe.'),
  ingredients: z.string().describe('A list of ingredients required for the recipe.'),
  instructions: z.string().describe('Step-by-step instructions for preparing the recipe.'),
  matchScore: z
    .number() 
    .int()
    .min(0)
    .max(100) 
    .describe('A score (0-100) indicating how well the recipe matches the provided ingredients. Higher score = better match.'),
});

const GenerateRecipesOutputSchema = z.array(RecipeSchema).describe('A ranked list of recipes.');
export type GenerateRecipesOutput = z.infer<typeof GenerateRecipesOutputSchema>;

export async function generateRecipesFromIngredients(input: GenerateRecipesInput): Promise<GenerateRecipesOutput> {
  return generateRecipesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRecipesPrompt',
  input: {schema: GenerateRecipesInputSchema},
  output: {schema: GenerateRecipesOutputSchema},
  prompt: `You are a world-class chef, skilled at creating delicious recipes from limited ingredients.

  The user will provide a list of ingredients they have on hand. You will generate a list of recipes that utilize those ingredients.
  Each recipe should have a name, a list of ingredients, and step-by-step instructions.

  Crucially, you will also assign a "matchScore" to each recipe, indicating how well it utilizes the provided ingredients. A higher score means the recipe is a better fit for the available ingredients.
  The matchScore should be between 0 and 100.

  Rank recipes based on matchScore so recipes that make better use of the provided ingredients come first.

  Ingredients: {{{ingredients}}}

  Format your output as a JSON array of recipes.
  Include a detailed list of ingredients and step-by-step instructions for each recipe.  Be creative!
  Ensure each recipe includes a matchScore.
  Make sure that the generated recipes are ranked based on the matchScore, with the highest score at the top of the list.
  Example Output:
  [
    {
      "name": "Pasta with Tomato Sauce",
      "ingredients": "Pasta, Tomato Sauce, Garlic, Olive Oil",
      "instructions": "1. Cook pasta according to package directions. 2. Saute garlic in olive oil. 3. Add tomato sauce and simmer. 4. Serve sauce over pasta.",
      "matchScore": 95
    },
    {
      "name": "Garlic Bread",
      "ingredients": "Bread, Garlic, Olive Oil",
      "instructions": "1. Mix garlic and olive oil. 2. Spread on bread. 3. Bake until golden brown.",
      "matchScore": 80
    }
  ]
  `,
});

const generateRecipesFlow = ai.defineFlow(
  {
    name: 'generateRecipesFlow',
    inputSchema: GenerateRecipesInputSchema,
    outputSchema: GenerateRecipesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
