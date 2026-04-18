import Link from "next/link";
import Image from "next/image";
import { type PokemonListResponse } from "@/types/pokemon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

async function getPokemonList(): Promise<PokemonListResponse> {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=24", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Pokemon list");
  }

  return res.json();
}

export default async function PokemonPage() {
  const data = await getPokemonList();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">My Pokédex</h1>
        <p className="text-muted-foreground">
          Server-side fetched from PokéAPI
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.results.map((pokemon, index) => {
          // Extract ID from URL (e.g., "https://pokeapi.co/api/v2/pokemon/1/")
          const id = pokemon.url.split("/").filter(Boolean).pop();
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

          return (
            <Link key={pokemon.name} href={`/pokemon/${id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer overflow-hidden border-2 hover:border-primary">
                <CardHeader className="bg-muted/50 p-4 relative pt-14">
                  <div className="absolute top-2 right-3 text-sm font-bold text-muted-foreground">
                    #{id?.toString().padStart(3, "0")}
                  </div>
                  <div className="flex justify-center -mt-16">
                    <div className="relative w-32 h-32 mt-4">
                      <Image
                        src={imageUrl}
                        alt={pokemon.name}
                        fill
                        className="object-contain drop-shadow-md"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index < 8}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 text-center">
                  <CardTitle className="capitalize text-xl">
                    {pokemon.name}
                  </CardTitle>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
