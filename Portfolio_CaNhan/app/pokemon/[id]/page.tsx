import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { type PokemonDetail } from "@/types/pokemon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

async function getPokemon(id: string): Promise<PokemonDetail | null> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error("Failed to fetch Pokemon");
  }

  return res.json();
}

export default async function PokemonDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const pokemon = await getPokemon(resolvedParams.id);

  if (!pokemon) {
    notFound();
  }

  const imageUrl =
    pokemon.sprites.other?.["official-artwork"]?.front_default ||
    pokemon.sprites.front_default;

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <Link href="/pokemon" className="inline-block mb-6">
        <Button variant="ghost" className="gap-2">
          &larr; Back to Pokédex
        </Button>
      </Link>

      <Card className="overflow-hidden border-2">
        <CardHeader className="text-center bg-muted/30 pb-12 relative">
          <div className="absolute top-4 right-6 text-2xl font-bold text-muted-foreground/30">
            #{pokemon.id.toString().padStart(3, "0")}
          </div>
          <CardTitle className="capitalize text-4xl mt-4 mb-2">
            {pokemon.name}
          </CardTitle>
          <div className="flex gap-2 justify-center mt-4">
            {pokemon.types.map((typeInfo) => (
              <Badge
                key={typeInfo.type.name}
                variant="default"
                className="capitalize text-sm px-4 py-1"
              >
                {typeInfo.type.name}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="relative pt-16 pb-8 px-6 sm:px-12">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 drop-shadow-xl">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={pokemon.name}
                fill
                className="object-contain"
                priority
              />
            )}
          </div>

          <div className="grid grid-cols-2 gap-8 text-center mt-4 bg-muted/10 p-6 rounded-xl">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Height</div>
              <div className="font-semibold text-lg">
                {pokemon.height / 10} m
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Weight</div>
              <div className="font-semibold text-lg">
                {pokemon.weight / 10} kg
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4 text-center border-b pb-2">
              Base Stats
            </h3>
            <div className="space-y-3">
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name} className="flex items-center">
                  <div className="w-30 text-sm font-medium capitalize text-muted-foreground">
                    {stat.stat.name.replace("-", " ")}
                  </div>
                  <div className="font-semibold w-12 text-right mr-4">
                    {stat.base_stat}
                  </div>
                  <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-primary`}
                      style={{
                        width: `${Math.min((stat.base_stat / 255) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
