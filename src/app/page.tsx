'use client';

import { useState, useTransition } from 'react';
import { z } from 'zod';
import { ChefHat } from 'lucide-react';

import { handleGenerateRecipes } from '@/app/actions';
import { IngredientForm } from '@/components/ingredient-form';
import { RecipeList } from '@/components/recipe-list';
import type { Recipe } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  ingredients: z.string().min(3),
});

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      const result = await handleGenerateRecipes(data.ingredients);
      if (result.error) {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
        setRecipes([]);
      } else if (result.data) {
        setRecipes(result.data);
      }
    });
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
        <div className="flex items-center gap-2 font-semibold">
          <ChefHat className="h-6 w-6 text-primary" />
          <span className="text-xl font-headline">Your Chef</span>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto grid max-w-4xl gap-8">
          <IngredientForm onSubmit={onSubmit} isPending={isPending} />
          <RecipeList recipes={recipes} isPending={isPending} />
        </div>
      </main>
      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        <p>© 2025 Your Chef - Developer By Priyanshu,<br/> All rights reserved.</p>
      </footer>
    </div>
  );
}
