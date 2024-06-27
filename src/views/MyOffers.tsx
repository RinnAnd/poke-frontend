import { PokemonProps } from "@/components/Pokemon";
import { useQueries } from "@/hooks/useQueries";
import { FC, useEffect, useState } from "react";
import Offer from "@/components/Offer";
import { UserPokemon } from "./Home";
import { useNavigate } from "react-router-dom";

export interface UserPokemonWithUser {
  forTrade: boolean;
  id: string;
  level: number;
  pokemon: PokemonProps;
  user: {
    id: string;
    username: string;
  };
}

interface OfferResponse {
  id: string;
  status: "accepted" | "rejected" | "pending";
  offeredTradePokemon: {
    id: string;
    userPokemon: UserPokemonWithUser;
  };
  targetTradePokemon: {
    id: string;
    userPokemon: UserPokemon;
  };
}

const MyOffers: FC = () => {
  const { getUserOffers } = useQueries();
  const navigate = useNavigate();

  const [offers, setOffers] = useState<OfferResponse[]>([]);

  async function fetchOffers() {
    const user = localStorage.getItem("user");
    const userId = user ? JSON.parse(user).id : "";
    const offers = await getUserOffers(userId);
    setOffers(offers);
  }

  const openOffers = offers.filter((offer) => offer.status === "pending");

  function TradeButton({ text, action }: { text: string; action: () => void }) {
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
    fetchOffers();
    /* eslint-disable-next-line */
  }, []);

  return (
    <div className="flex flex-col p-6 gap-6 justify-center w-full">
      <div className="flex flex-col w-full h-32 justify-center gap-3">
        <div className="w-full">
          <TradeButton text="Go back" action={() => navigate('/trading')} />
        </div>
        <h1 className="text-3xl font-bold text-center">
          Offers you have received
        </h1>
      </div>
      <div className="flex w-full">
        {openOffers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {openOffers.map((offer) => (
              <Offer
                offerId={offer.id}
                status={offer.status}
                offeredTradePokemon={offer.offeredTradePokemon}
                targetTradePokemon={offer.targetTradePokemon}
              />
            ))}
          </div>
        ) : (
          <p className="max-w-96 text-center">
            Seems like you don't have any offers currently, if you have Pokémons
            for trading the offers will show up here.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyOffers;
