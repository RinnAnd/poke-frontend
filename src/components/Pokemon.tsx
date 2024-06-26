import { colorSelector, nameFormatter } from "@/utils/utils";
import { FC } from "react";

export interface PokemonProps {
  id: number;
  name: string;
  forTrade?: boolean;
  level?: number;
  height: number;
  weight: number;
  images: string[];
  types: string[];
  abilities: string[];
  stats: { stat: string; base_stat: number }[];
}

function GhostButton({ text, selected }: { text: string; selected?: boolean }) {
  return (
    <button
      className={`${
        selected ? "text-white border-b" : "text-zinc-500"
      } text-xs p-1 rounded-md cursor-pointer`}
    >
      {text}
    </button>
  );
}

const Pokemon: FC<PokemonProps> = ({
  types,
  images,
  name,
  weight,
  height,
  level,
  forTrade,
}) => {
  let bg = "bg-gray-400";
  bg = colorSelector(types[0]);

  return (
    <div className="rounded-3xl w-60 flex bg-black aspect-[1/1.5] z-0 relative font-montserrat justify-center overflow-hidden">
      {level ? (
        <div className="absolute top-2 left-2 bg-zinc-500 text-black rounded-full p-1 text-xs font-semibold z-10">
          Lv.{level}
        </div>
      ) : null}
      {forTrade ? (
        <div className="absolute top-2 right-2 bg-cyan-600 text-black rounded-full p-1 text-xs font-semibold z-10">
          For trade
        </div>
      ) : null}
      <div
        className={`absolute w-40 h-40 right-6 top-9 ${bg} rounded-full blur-xl opacity-35`}
      ></div>
      <div
        className={`absolute w-40 h-40 left-0 bottom-20 ${bg} rounded-full blur-xl opacity-20`}
      ></div>
      <div
        className={`absolute w-36 h-20 right-0 bottom-14 ${bg} rounded-full blur-xl opacity-20`}
      ></div>
      <div className="flex flex-col items-center justify-center">
        <div className="w-9/12 flex flex-col items-center h-full justify-evenly">
          <div className="flex flex-col items-center">
            <img src={images[0]} className="z-10 relative" />
            <h1 className="text-white text-xl font-semibold z-10">
              {nameFormatter(name)}
            </h1>
            <div className="flex gap-2">
              {types.map((type) => (
                <p key={type} className="text-xs text-zinc-400">
                  {nameFormatter(type)}
                </p>
              ))}
            </div>
          </div>
          <div className="flex gap-3 z-10">
            <GhostButton text="Stats" />
            <GhostButton text="Abilities" />
          </div>
          <div className="flex w-full justify-around bg-gradient-to-b from-zinc-900 to-black rounded-lg z-10 p-3">
            <div className="flex flex-col items-center">
              <p className="text-sm">{weight}00g</p>
              <p className="text-xs text-zinc-500">Weight</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm">{height}0cm</p>
              <p className="text-xs text-zinc-500">Height</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
