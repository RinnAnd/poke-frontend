import { FC, useEffect, useState } from "react";
import { useQueries } from "@/hooks/useQueries";
import { PokemonProps } from "./Pokemon";
import PokemonForMenu from "./PokemonForMenu";
import { Button } from "./ui/button";
import { nameFormatter } from "@/utils/utils";

interface TradeOfferProps {
  userId: string;
  tradeId: string;
  close: () => void;
}

interface FetchResponse {
  forTrade: boolean;
  id: string;
  level: number;
  pokemon: PokemonProps;
}

const TradeOffer: FC<TradeOfferProps> = ({ close, userId, tradeId }) => {
  const { fetchUserPokemon, createTradeOffer } = useQueries();

  const [userPokemons, setUserPokemons] = useState<FetchResponse[]>([]);

  const [tradeOfferIds, setTradeOfferIds] = useState({
    tradeId,
    offeredPokemonId: "",
    pokemonName: "",
  });

  async function setPokemons() {
    const response = await fetchUserPokemon(userId);
    setUserPokemons(response);
  }

  async function handleTradeOffer() {
    if (!tradeOfferIds.offeredPokemonId) return;
    const response = await createTradeOffer(
      tradeOfferIds.tradeId,
      tradeOfferIds.offeredPokemonId
    );
    if (!response) {
      alert("Trade offer failed to be made.");
      return;
    }
    alert("Trade offer made!");
    close();
  }

  useEffect(() => {
    setPokemons();
    console.log(tradeOfferIds);
    /* eslint-disable-next-line */
  }, [tradeOfferIds]);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <div
        className="absolute inset-0 backdrop-blur-md z-20"
        onClick={close}
      ></div>
      <div className="w-9/12 h-5/6 bg-gradient-to-b from-black via-zinc-900 to-black border border-zinc-700 rounded-xl z-20 p-8 flex flex-col items-center max-w-[50rem]">
        <h1 className="text-3xl font-semibold">Create a trade offer</h1>
        <div className="w-full flex flex-col items-center">
          <h1>Your collection</h1>
          <div className="flex flex-col w-full items-center justify-center">
            <div className="w-full h-[450px] p-4 gap-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 overflow-y-scroll justify-start">
              {userPokemons.map(
                (pokemon) =>
                  !pokemon.forTrade && (
                    <PokemonForMenu
                      id={pokemon.id}
                      name={pokemon.pokemon.name}
                      images={pokemon.pokemon.images}
                      level={pokemon.level}
                      offeredPokemonId={tradeOfferIds.offeredPokemonId}
                      setTradingOffer={setTradeOfferIds}
                    />
                  )
              )}
            </div>
          </div>
        </div>
        <div>
          <p>Choose the Pokémon you want to offer</p>
        </div>
        {tradeOfferIds.offeredPokemonId && (
          <p>
            You selected {nameFormatter(tradeOfferIds.pokemonName)} to offer for
            trade
          </p>
        )}
        <div className="w-full flex justify-center gap-6">
          <Button onClick={close}>Cancel</Button>
          <Button onClick={handleTradeOffer}>Offer trade</Button>
        </div>
      </div>
    </div>
  );
};

export default TradeOffer;
