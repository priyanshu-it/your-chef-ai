'use client';

import { useState } from 'react';
import { handleGetNutritionalInfo } from '@/app/actions';
import type { NutritionalInfo as NutritionalInfoType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, HeartPulse } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export function NutritionalInfo({ recipeName }: { recipeName: string }) {
  const [info, setInfo] = useState<NutritionalInfoType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [wasFetched, setWasFetched] = useState(false);
  const { toast } = useToast();

  const fetchInfo = async () => {
    setIsLoading(true);
    setWasFetched(true);
    setError(null);
    const result = await handleGetNutritionalInfo(recipeName);
    if (result.error) {
      setError(result.error);
      toast({
        title: 'Error',
        description: result.error,
        variant: 'destructive',
      });
    } else {
      setInfo(result.data);
    }
    setIsLoading(false);
  };

  if (!wasFetched) {
    return (
      <Button variant="ghost" onClick={fetchInfo} disabled={isLoading} className="mt-4 w-full justify-start p-2 h-auto text-left text-muted-foreground hover:text-foreground">
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <HeartPulse className="mr-2 h-4 w-4" />
        )}
        Show Nutritional Info
      </Button>
    );
  }

  return (
    <div className="mt-4 rounded-lg border bg-muted/50 p-4">
      <h4 className="font-semibold text-sm mb-2 text-foreground">Nutritional Information (Approx.)</h4>
      {isLoading && (
        <div className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-3/5" />
        </div>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
      {info && !isLoading && (
        <ul className="space-y-1 text-sm text-muted-foreground">
          <li className="flex justify-between"><span>Calories:</span> <strong>{info.calories}</strong></li>
          <li className="flex justify-between"><span>Protein:</span> <strong>{info.protein}</strong></li>
          <li className="flex justify-between"><span>Carbs:</span> <strong>{info.carbs}</strong></li>
          <li className="flex justify-between"><span>Fats:</span> <strong>{info.fats}</strong></li>
        </ul>
      )}
    </div>
  );
}
