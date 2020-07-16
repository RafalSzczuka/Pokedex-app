export const fetchList = async url => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const fetchDetails = async (url, signal) => {
  const response = await fetch(url, {method: 'get', signal});

  const data = await response.json();
  return data;
};

export const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon?limit=964';
export const berriesUrl = 'https://pokeapi.co/api/v2/berry?limit=964';
