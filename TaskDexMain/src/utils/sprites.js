import { getPokemonIdByName } from '../data/pokemonData.js';

// Sprite URL mapping
const RAW_BASE_URL = "https://raw.githubusercontent.com/wrish6/prototype/main/";

export const getGifUrl = (name) => {
  // Handle Trainer Sprites (PNG format)
  switch (name) {
    case 'TrainerMale':
      return `${RAW_BASE_URL}ash-sinnoh.png`;
    case 'TrainerFemale':
      return `${RAW_BASE_URL}rosa-pokestar2.png`;
  }

  // Handle Pokémon Sprites (GIF format, named by Pokedex ID)
  const pokemonId = getPokemonIdByName(name);
  
  if (pokemonId) {
    return `${RAW_BASE_URL}${pokemonId}.gif`;
  }
  
  // Fallback placeholder
  return `https://placehold.co/56x56/1e293b/ffffff/png?text=${name}`;
};

