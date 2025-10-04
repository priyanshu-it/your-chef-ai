import type { GenerateRecipesOutput } from "@/ai/flows/generate-recipes-from-ingredients";
import type { NutritionalInformationOutput } from "@/ai/flows/display-nutritional-information";

export type Recipe = GenerateRecipesOutput[0];
export type NutritionalInfo = NutritionalInformationOutput;
