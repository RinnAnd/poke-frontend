import { FC } from "react";
import { nameFormatter } from "@/utils/utils";

interface PokemonForMenuProps {
  id: string;
  name: string;
  level: number;
  images: string[];
  offeredPokemonId: string;
  setTradingOffer: React.Dispatch<
    React.SetStateAction<{
      tradeId: string;
      offeredPokemonId: string;
      pokemonName: string;
    }>
  >;
}

const PokemonForMenu: FC<PokemonForMenuProps> = ({
  id,
  name,
  images,
  level,
  offeredPokemonId,
  setTradingOffer,
}) => {
  return (
    <div
      className={`w-32 border rounded-xl h-44 ${
        offeredPokemonId == id ? "border-white" : "border-zinc-800"
      } flex flex-col items-center justify-between over pt-2 pb-4 bg-zinc-900 cursor-pointer`}
      onClick={() =>
        setTradingOffer((prev) => ({
          ...prev,
          offeredPokemonId: id,
          pokemonName: name,
        }))
      }
    >
      <div className="w-full px-2">
        <div className="w-full">
          <p className="text-xs text-zinc-400">lv. {level}</p>
        </div>
        <h1 className="text-sm text-center mt-2">{nameFormatter(name)}</h1>
      </div>
      <img src={images[1] || images[0]} alt={name} className="max-h-20" />
    </div>
  );
};

export default PokemonForMenu;
