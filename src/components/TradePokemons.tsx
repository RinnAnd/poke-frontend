import { FC, useEffect, useState } from "react";
import { nameFormatter } from "@/utils/utils";
import { useQueries } from "@/hooks/useQueries";
import { UserPokemon } from "@/views/Home";
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

interface TradePokemonsProps {
  setTrade: React.Dispatch<React.SetStateAction<boolean>>;
}

function Pokemon({ pokemon }: { pokemon: UserPokemon }) {
  return (
    <div className="w-32 border rounded-xl h-36 border-zinc-800 flex flex-col items-center justify-between over pt-2 pb-4 bg-zinc-900 cursor-pointer">
      <div className="w-full px-2">
        <div className="w-full">
          <p className="text-xs text-zinc-400">lv. {pokemon.level}</p>
        </div>
        <h1 className="text-sm text-center mt-2">
          {nameFormatter(pokemon.pokemon.name)}
        </h1>
      </div>
      <img
        src={pokemon.pokemon.images[1] || pokemon.pokemon.images[0]}
        alt={"not found"}
        className="max-h-16"
      />
    </div>
  );
}

const TradePokemons: FC<TradePokemonsProps> = ({ setTrade }) => {
  const { fetchUserPokemon, tradePokemon } = useQueries();
  const [userPokemons, setUserPokemons] = useState<UserPokemon[]>([]);

  async function handleTradePokemon(pokemonId: string) {
    const res = await tradePokemon(pokemonId);
    if (res) {
      setTrade(false);
      setPokemons();
    }
  }

  async function setPokemons() {
    let userId = localStorage.getItem("user");
    if (userId) {
      userId = JSON.parse(userId).id;
    }
    const pokemons: UserPokemon[] = await fetchUserPokemon(userId!);
    setUserPokemons(pokemons);
  }

  useEffect(() => {
    setPokemons();
    /* eslint-disable-next-line */
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="h-full fixed backdrop-blur-sm z-10"
        style={{ width: "100%", height: "100%" }}
        onClick={() => setTrade(false)}
      ></div>
      <div className="relative z-10 w-10/12 max-w-[900px] px-6 py-10 h-fit bg-gradient-to-b from-black via-zinc-900 to-black border border-zinc-700 rounded-xl flex flex-col items-center justify-center gap-6">
        <h1 className="text-3xl font-semibold">Your pokemon</h1>
        <div className="w-full bg-zinc-950 h-96 border border-zinc-800 rounded-md">
          <div className="w-full h-full p-4 gap-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 overflow-y-scroll justify-start">
            {userPokemons.map((pokemon) => {
              if (pokemon.forTrade) return null;
              return (
                <div className="relative">
                  <Pokemon key={pokemon.id} pokemon={pokemon} />
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <button className="bg-emerald-500 text-xs p-1 rounded-md relative top-[-140px] left-[85px]">
                        Trade
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-black border-zinc-800">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Trade Pokémon</AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogDescription>
                        Are you sure you want to open{" "}
                        {nameFormatter(pokemon.pokemon.name)} for trading?
                      </AlertDialogDescription>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-transparent border-zinc-700 hover:bg-transparent hover:text-white">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleTradePokemon(pokemon.id)}
                        >
                          Trade
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradePokemons;
