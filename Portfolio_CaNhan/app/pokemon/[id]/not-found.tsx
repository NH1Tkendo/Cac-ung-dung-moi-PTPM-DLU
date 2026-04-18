import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PokemonNotFound() {
  return (
    <div className="container mx-auto py-16 px-4 flex flex-col items-center justify-center min-h-[50vh] text-center">
      <div className="text-6xl font-black text-muted mb-4">404</div>
      <h2 className="text-3xl font-bold mb-2">Pokémon Not Found</h2>
      <p className="text-muted-foreground mb-8">
        We searched high and low in the tall grass, but couldn&apos;t find a
        Pokémon with this ID.
      </p>
      <Link href="/pokemon">
        <Button size="lg">Return to Pokédex</Button>
      </Link>
    </div>
  );
}
