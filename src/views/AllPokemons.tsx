import { FC, useEffect, useState } from "react";
import {
  PlusCircledIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useQueries } from "@/hooks/useQueries";
import Pokemon, { PokemonProps } from "@/components/Pokemon";
import { Button } from "@/components/ui/button";
import { nameFormatter } from "@/utils/utils";

interface AllPokemonsProps {}

const AllPokemons: FC<AllPokemonsProps> = () => {
  const { getAllPokemons, addUserPokemon } = useQueries();
  const [pokemons, setPokemons] = useState<PokemonProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 8;

  const totalPages = Math.ceil(pokemons.length / ITEMS_PER_PAGE);

  async function fetchPokemons() {
    const pokemons = await getAllPokemons();
    setPokemons(pokemons);
  }

  async function addPokemon(pokemonId: number) {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      const response = await addUserPokemon(userData.id, pokemonId);
      if (response.status !== 200) {
        alert("Error adding Pokémon to your collection");
        return;
      }
      alert("Pokémon added to your collection!");
    }
  }

  useEffect(() => {
    fetchPokemons();
    /* eslint-disable-next-line */
  }, []);

  const paginatedPokemons = pokemons.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="p-10 w-full flex flex-col items-center gap-10">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-semibold">All Pokémons</h1>
        <p className="text-zinc-500">Choose your next Pokémon!</p>
      </div>
      <div className="flex w-full justify-end mt-[-50px] gap-4">
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          size="icon"
          className="border border-zinc-700"
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          size="icon"
          className="border border-zinc-700"
        >
          <ChevronRightIcon />
        </Button>
      </div>
      <div className="w-full flex items-center flex-col">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {paginatedPokemons.map((pokemon) => (
            <div className="relative">
              <Pokemon key={pokemon.id} {...pokemon} />
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button
                    size="icon"
                    className="absolute top-2 right-2 rounded-2xl"
                  >
                    <PlusCircledIcon />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-black border-zinc-800">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Capture Pokémon</AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogDescription>
                    Are you sure you want to add {nameFormatter(pokemon.name)}{" "}
                    to your collection?
                  </AlertDialogDescription>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-transparent border-zinc-700 hover:bg-transparent hover:text-white">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={() => addPokemon(pokemon.id)}>
                      Capture
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllPokemons;
