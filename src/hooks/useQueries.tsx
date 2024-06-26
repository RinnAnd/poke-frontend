const baseUrl = "http://localhost:1025";

export const useQueries = () => {
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${baseUrl}/user/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      return response.json();
    } catch (error) {
      return error;
    }
  };

  const fetchUserPokemon = async (id: string) => {
    try {
      const response = await fetch(`${baseUrl}/user/pokemon/${id}`);
      return response.json();
    } catch (error) {
      return error;
    }
  };

  const getAllPokemons = async () => {
    try {
      const response = await fetch(`${baseUrl}/pokemon`);
      return response.json();
    } catch (error) {
      return error;
    }
  };

  const addUserPokemon = async (userId: string, pokemonId: number) => {
    try {
      const response = await fetch(`${baseUrl}/user/pokemon`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, pokemonId }),
      });
      return response.json();
    } catch (error) {
      return error;
    }
  };

  const tradePokemon = async (userPokemonId: string) => {
    try {
      const response = await fetch(`${baseUrl}/trades`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userPokemonId }),
      });
      return response.json();
    } catch (error) {
      return error
    }
  }

  const getPokemonsForTrade = async () => {
    try {
      const response = await fetch(`${baseUrl}/trades`);
      return response.json();
    } catch (error) {
      return error;
    }
  };

  const createTradeOffer = async (
    tradeId: string,
    offeredPokemonId: string
  ) => {
    try {
      const response = await fetch(`${baseUrl}/trades/${tradeId}/propose`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ offeredPokemonId }),
      });
      return response.json();
    } catch (error) {
      return error;
    }
  };

  const getUserOffers = async (id: string) => {
    try {
      const response = await fetch(`${baseUrl}/trades/offers/${id}`);
      return response.json();
    } catch (error) {
      return error;
    }
  }

  return {
    fetchUserPokemon,
    login,
    addUserPokemon,
    getAllPokemons,
    createTradeOffer,
    getPokemonsForTrade,
    getUserOffers,
    tradePokemon,
  };
};
