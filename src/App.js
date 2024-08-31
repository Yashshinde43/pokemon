import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './components/PokemonCard';
import './App.css';

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
      const pokemonData = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const pokemonRecord = await axios.get(pokemon.url);
          return pokemonRecord.data;
        })
      );
      setPokemons(pokemonData);
      setFilteredPokemons(pokemonData); 
    };

    fetchPokemons();
  }, []);

  const handleSearch = () => {
    const filtered = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPokemons(filtered);
  };

  return (
    <div className="app">
      <h1>Pokemon</h1>
      <input
        type="text"
        placeholder="Search Pokemon"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="search-button" onClick={handleSearch}>Search</button> 
      <div className="pokemon-list">
        {filteredPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default App;
