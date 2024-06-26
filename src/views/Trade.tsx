import { FC, useEffect, useState } from "react";

import { useQueries } from "@/hooks/useQueries";
import Pokemon, { PokemonProps } from "@/components/Pokemon";
import TradeOffer from "@/components/TradeOffer";
import { useNavigate } from "react-router-dom";

interface TradeProps {}

interface OpenTrade {
  id: string;
  pokemonId: string;
  level: number;
  pokemon: PokemonProps;
  user: string;
}

interface QueryResponse {
  id: string;
  userPokemon: {
    id: string;
    level: number;
    pokemon: PokemonProps;
    user: {
      id: string;
      username: string;
    };
  };
}

const Trade: FC<TradeProps> = () => {
  const { getPokemonsForTrade } = useQueries();
  const navigate = useNavigate();

  const [trades, setTrades] = useState<OpenTrade[]>([]);
  const [openTrade, setOpenTrade] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const [tradeId, setTradeId] = useState<string>("");

  async function fetchPokemons() {
    const pokemons = await getPokemonsForTrade();
    if (pokemons.length > 0) {
      const openTrades: OpenTrade[] = pokemons.map((trade: QueryResponse) => {
        const user = localStorage.getItem("user");
        let userId;
        if (user) {
          const userData = JSON.parse(user);
          userId = userData.id;
        }
        if (trade.userPokemon.user.id !== userId) {
          return {
            id: trade.id,
            pokemonId: trade.userPokemon.id,
            level: trade.userPokemon.level,
            pokemon: trade.userPokemon.pokemon,
            user: trade.userPokemon.user.username,
          };
        } else {
          return null;
        }
      });
      setTrades(openTrades.filter((trade) => trade !== null));
    }
  }

  function handleOpenTrade(tradeId: string) {
    setOpenTrade(!openTrade);
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setUserId(userData.id);
    }
    setTradeId(tradeId);
  }

  function TradeButton({ text, action }: { text: string, action: () => void }) {
    return (
      <button
        className="bg-zinc-800 text-xs rounded-md p-2 hover:bg-zinc-600 transition-all"
        onClick={action}
      >
        {text}
      </button>
    );
  }

  useEffect(() => {
    fetchPokemons();
    /* eslint-disable-next-line */
  }, []);

  return (
    <div className="w-full flex flex-col gap-5 p-8">
      {openTrade && (
        <TradeOffer
          close={() => setOpenTrade(!openTrade)}
          userId={userId}
          tradeId={tradeId}
        />
      )}
      <div className="flex justify-between gap-2 items-center">
        <div>
          <TradeButton text="Go back" action={() => navigate('/home')} />
        </div>
        <div className="flex flex-col gap-3">
          <TradeButton text="Trade my Pokémon" action={() => navigate('/home')} />
          <TradeButton text="See offers" action={() => navigate('/home')} />
        </div>
      </div>
      <div className="w-full flex items-center justify-center">
        <h1 className="text-4xl font-semibold mb-10">Pokémons for trade</h1>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {trades.map((trade) => (
          <div key={trade.id} className="relative flex flex-col items-center">
            <Pokemon level={trade.level} forTrade {...trade.pokemon} />
            <span className="text-xs text-zinc-400 absolute bottom-8">
              Owner: {trade.user}
            </span>
            <button onClick={() => handleOpenTrade(trade.id)}>Offer</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trade;
