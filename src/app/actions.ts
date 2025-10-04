'use server';

import { generateRecipesFromIngredients } from '@/ai/flows/generate-recipes-from-ingredients';
import { getNutritionalInformation } from '@/ai/flows/display-nutritional-information';
import type { Recipe, NutritionalInfo } from '@/lib/types';

export async function handleGenerateRecipes(ingredients: string): Promise<{ data: Recipe[] | null; error: string | null; }> {
  if (!ingredients) {
    return { data: null, error: 'Please enter some ingredients.' };
  }
  try {
    const recipes = await generateRecipesFromIngredients({ ingredients });
    if (!recipes || recipes.length === 0) {
      return { data: null, error: "Couldn't generate recipes. Try different ingredients." };
    }
    return { data: recipes, error: null };
  } catch (e) {
    console.error(e);
    return { data: null, error: 'An unexpected error occurred. Please try again.' };
  }
}

export async function handleGetNutritionalInfo(recipeName: string): Promise<{ data: NutritionalInfo | null; error: string | null; }> {
  if (!recipeName) {
    return { data: null, error: 'Recipe name is missing.' };
  }
  try {
    const nutritionalInfo = await getNutritionalInformation({ recipeName });
    return { data: nutritionalInfo, error: null };
  } catch (e) {
    console.error(e);
    return { data: null, error: 'Failed to get nutritional information.' };
  }
}
