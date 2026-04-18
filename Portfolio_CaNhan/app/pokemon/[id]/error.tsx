"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function PokemonError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto py-16 px-4 flex flex-col items-center justify-center min-h-[50vh] text-center">
      <div className="w-16 h-16 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mb-6">
        <AlertCircle size={32} />
      </div>
      <h2 className="text-2xl font-bold mb-4">Failed to load Pokémon</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        We encountered an error while trying to fetch data from the Pokédex.
        This might be a temporary issue with the PokéAPI.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => reset()}>Try again</Button>
        <Link href="/pokemon">
          <Button variant="outline">Back to Pokédex</Button>
        </Link>
      </div>
    </div>
  );
}
