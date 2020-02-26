import React, { useState, useEffect } from 'react';
import ApolloClient, { gql } from 'apollo-boost';

import PokemonList from 'components/PokemonList/PokemonList';
import Pokedex from 'components/Pokedex/Pokedex';
import Navbar from 'components/Navbar/Navbar';

import './App.css';

function App() {
  const [pokemonList, setPokemonList] = useState(null);
  const [currentPokedexPokemon, setCurrentPokedexPokemon] = useState(null);

  useEffect(() => {
    const client = new ApolloClient({
      uri: 'https://graphql-pokemon.now.sh/'
    });

    client
      .query({
        query: gql`
          {
            pokemons(first: 151) {
              name
              id
              number
            }
          }
        `
      })
      .then(result => {
        setPokemonList(result.data.pokemons);
      });
  }, []);

  return (
    <>
      <Navbar />
      {currentPokedexPokemon && (
        <Pokedex
          pokemon={currentPokedexPokemon}
          setCurrent={setCurrentPokedexPokemon}
        />
      )}
      {pokemonList && (
        <PokemonList
          pokemonList={pokemonList}
          setCurrent={setCurrentPokedexPokemon}
        />
      )}
    </>
  );
}

export default App;
