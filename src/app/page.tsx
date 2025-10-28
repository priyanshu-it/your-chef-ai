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
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-background z-50 flex flex-col items-center p-4">
        <div className="flex items-center gap-2 font-semibold">
          <ChefHat className="h-9 w-9 text-primary" />
          <span className="text-4xl font-headline">Your Chef</span>
        </div>
        <p className="max-w-md text-center mt-2">
          Users can input a list of available ingredients to receive recipe suggestions instantly.
        </p>
        <div className="w-full h-1.5 bg-green-500 m-4 rounded-full" />
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-[10rem] md:pt-[10rem] px-4 md:px-4 lg:px-4">
        <div className="mx-auto max-w-full flex flex-col md:flex-row relative">

          {/* Left Column - Sidebar */}
          <aside className="w-full md:w-1/3 md:fixed md:top-[9.5rem] md:left-0 md:h-[calc(100vh-9.5rem)] md:z-40 md:overflow-y-auto bg-background p-4">
            <IngredientForm onSubmit={onSubmit} isPending={isPending} />
          </aside>

          {/* Right Column - Main Content */}
          <section className="w-full md:ml-[33.3333%] p-4 pb-32">
            <RecipeList recipes={recipes} isPending={isPending} />
          </section>
        </div>
      </main>

      {/* Fixed Footer */}
      <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 py-4 text-center text-sm text-muted-foreground shadow z-50">
        <p>
          © 2025 <span className="font-semibold text-primary">Your Chef</span> — Developed by Priyanshu.
          <br />
          All rights reserved.
        </p>
      </footer>
    </div>
  );
}
