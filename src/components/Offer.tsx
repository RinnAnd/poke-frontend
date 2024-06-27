import { useQueries } from "@/hooks/useQueries";
import { nameFormatter } from "@/utils/utils";
import { UserPokemon } from "@/views/Home";
import { UserPokemonWithUser } from "@/views/MyOffers";
import { FC } from "react";

interface OfferProps {
  offerId: string;
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

const Offer: FC<OfferProps> = ({
  offerId,
  offeredTradePokemon,
  targetTradePokemon,
  status,
}) => {
  const { confirmTrade } = useQueries();

  function handleConfirmTrade(offerId: string, confirm: boolean) {
    confirmTrade(offerId, confirm);
    if (confirm) {
      alert("Trade offer accepted");
    }
    if (!confirm) {
      alert("Trade offer declined");
    }
    window.location.reload();
  }

  return (
    <div className="flex flex-col items-center border py-4 px-6 rounded-xl border-zinc-700 gap-3">
      <p
        className={`text-sm ${
          status == "pending" ? "text-green-700" : "text-red-700"
        }`}
      >
        {status == "pending" ? "open" : status}
      </p>
      <div className="flex gap-3">
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm">
            {offeredTradePokemon.userPokemon.user.username}{" "}
            <span className="text-zinc-500">offered</span>
          </p>
          <Pokemon pokemon={offeredTradePokemon.userPokemon} />
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm">For your</p>
          <Pokemon pokemon={targetTradePokemon.userPokemon} />
        </div>
      </div>
      {status == "pending" && (
        <div className="w-full flex gap-3">
          <button
            className="w-1/2 bg-green-900 rounded-md p-1 hover:bg-green-800 transition-all"
            onClick={() => handleConfirmTrade(offerId, true)}
          >
            Accept
          </button>
          <button
            className="w-1/2 bg-red-950 rounded-md p-1 hover:bg-red-900 transition-all"
            onClick={() => handleConfirmTrade(offerId, false)}
          >
            Decline
          </button>
        </div>
      )}
    </div>
  );
};

export default Offer;
