'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { NutritionalInfo } from '@/components/nutritional-info';
import type { Recipe } from '@/lib/types';
import { Utensils } from 'lucide-react';

export function RecipeCard({ recipe }: { recipe: Recipe }) {
    
    function formatList(list: string) {
        return list.split(/, | ,|,/).map(item => item.trim()).filter(Boolean);
    }
    
    function formatInstructions(text: string) {
        return text.split(/\d+\.\s/).filter(Boolean).map(step => step.trim());
    }

    const ingredientsList = formatList(recipe.ingredients);
    const instructionsList = formatInstructions(recipe.instructions);

  return (
    <Card className="shadow-md transition-shadow hover:shadow-xl">
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <CardTitle className="font-headline text-xl">{recipe.name}</CardTitle>
            <CardDescription className="pt-2">
                Match Score: {recipe.matchScore}%
            </CardDescription>
          </div>
          <div className="flex items-center flex-shrink-0 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
            <Utensils className="mr-2 h-4 w-4" />
            Recipe
          </div>
        </div>
        <Progress value={recipe.matchScore} className="w-full mt-2" aria-label={`Match Score: ${recipe.matchScore}%`} />
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="ingredients">
            <AccordionTrigger>Ingredients</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc space-y-1 pl-6 text-muted-foreground">
                {ingredientsList.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="instructions">
            <AccordionTrigger>Instructions</AccordionTrigger>
            <AccordionContent>
                <ol className="list-decimal space-y-3 pl-6 text-muted-foreground">
                    {instructionsList.map((step, index) => (
                        <li key={index}>{step}</li>
                    ))}
                </ol>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <NutritionalInfo recipeName={recipe.name} />
      </CardContent>
    </Card>
  );
}
