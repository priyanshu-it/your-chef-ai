'use client';

import type { Recipe } from '@/lib/types';
import { RecipeCard } from '@/components/recipe-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChefHat } from 'lucide-react';

type RecipeListProps = {
  recipes: Recipe[];
  isPending: boolean;
};

function RecipeSkeleton() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2 mt-2" />
                <Skeleton className="h-4 w-full mt-2" />
            </CardHeader>
            <CardContent className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </CardContent>
        </Card>
    );
}

export function RecipeList({ recipes, isPending }: RecipeListProps) {
  if (isPending) {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-headline font-bold">Conjuring up some recipes...</h2>
            <div className="grid gap-6 md:grid-cols-1">
                <RecipeSkeleton />
                <RecipeSkeleton />
            </div>
        </div>
    );
  }
  
  if (recipes.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center py-16 text-center border-dashed">
        <CardHeader>
            <div className="mx-auto bg-secondary p-3 rounded-full">
                <ChefHat className="h-10 w-10 text-muted-foreground" />
            </div>
            <CardTitle className="mt-4 font-headline">Welcome to Your Chef</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">
                Enter some ingredients above to discover your next meal.
            </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-headline font-bold">Your Recipe Suggestions</h2>
      <div className="grid gap-6 md:grid-cols-1">
        {recipes.map((recipe, index) => (
          <RecipeCard key={`${recipe.name}-${index}`} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
