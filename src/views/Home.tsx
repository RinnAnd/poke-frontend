import { FC, useEffect, useState } from "react";

import Pokemon from "@/components/Pokemon";
import { useQueries } from "@/hooks/useQueries";
import { PokemonProps } from "@/components/Pokemon";
import { useNavigate } from "react-router-dom";

interface HomeProps {}

interface UserPokemon {
  forTrade: boolean;
  id: string;
  level: number;
  pokemon: PokemonProps;
}

const Home: FC<HomeProps> = () => {
  const { fetchUserPokemon } = useQueries();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    id: "",
    username: "",
    email: "",
  });

  const [userPokemons, setUserPokemons] = useState<PokemonProps[]>([]);

  async function setUpUser() {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setUser({
        id: userData.id,
        username: userData.username,
        email: userData.email,
      });
    }
  }

  async function setPokemons() {
    const pokemons: UserPokemon[] = await fetchUserPokemon(user.id);
    if (pokemons) {
      const userPokemons: PokemonProps[] = pokemons.map(
        (pokemon: UserPokemon) => ({
          id: pokemon.pokemon.id,
          name: pokemon.pokemon.name,
          forTrade: pokemon.forTrade,
          level: pokemon.level,
          height: pokemon.pokemon.height,
          weight: pokemon.pokemon.weight,
          images: pokemon.pokemon.images,
          types: pokemon.pokemon.types,
          abilities: pokemon.pokemon.abilities,
          stats: pokemon.pokemon.stats,
        })
      );
      setUserPokemons(userPokemons);
    }
  }

  function RedirectButton({ page, text }: { page: string; text: string }) {
    return (
      <button
        className="bg-zinc-800 text-xs rounded-md p-2 hover:bg-zinc-600 transition-all"
        onClick={() => navigate(page)}
      >
        {text}
      </button>
    );
  }

  useEffect(() => {
    setUpUser();
  }, []);

  useEffect(() => {
    if (user.id) {
      setPokemons();
    }
    /* eslint-disable-next-line */
  }, [user]);

  return (
    <div className="p-16 max-w-[2200px] h-screen">
      <div className="flex gap-2 w-full justify-between">
        <div className="flex flex-col gap-3">
          <h1 className="text-5xl font-semibold">Hi! {user.username}</h1>
          <p className="text-zinc-500">Welcome back</p>
        </div>
        <div className="flex flex-col gap-3">
          <RedirectButton page="/trading" text="Trade" />
          <RedirectButton page="/pokemons" text="Add Pokémons" />
        </div>
      </div>
      <div className="w-full h-32 flex items-center justify-center">
        <h2 className="text-3xl">Here's your collection</h2>
      </div>
      <div className="flex flex-col items-center pb-10">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {userPokemons.map((pokemon) => (
            <Pokemon
              key={pokemon.id}
              id={pokemon.id}
              forTrade={pokemon.forTrade}
              name={pokemon.name}
              level={pokemon.level}
              height={pokemon.height}
              weight={pokemon.weight}
              images={pokemon.images}
              types={pokemon.types}
              abilities={pokemon.abilities}
              stats={pokemon.stats}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
