export function nameFormatter(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function colorSelector(type: string) {
  switch (type) {
    case "fire":
      return "bg-red-600";
    case "water":
      return "bg-blue-600";
    case "grass":
      return "bg-green-600";
    case "electric":
      return "bg-yellow-400";
    case "ice":
      return "bg-blue-300";
    case "fighting":
      return "bg-red-800";
    case "poison":
      return "bg-purple-600";
    case "ground":
      return "bg-yellow-800";
    case "flying":
      return "bg-gray-200";
    case "psychic":
      return "bg-purple-400";
    case "bug":
      return "bg-green-400";
    case "rock":
      return "bg-yellow-500";
    case "ghost":
      return "bg-purple-800";
    case "dark":
      return "bg-gray-800";
    case "dragon":
      return "bg-red-400";
    case "steel":
      return "bg-gray-500";
    case "fairy":
      return "bg-pink-400";
    default:
      return "bg-gray-400";
  }
}
