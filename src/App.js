import React, { useState, useEffect, useContext } from 'react';
import ApolloClient, { gql } from 'apollo-boost';

import PokemonList from 'components/PokemonList/PokemonList';
import Pokedex from 'components/Pokedex/Pokedex';
import Navbar from 'components/Navbar/Navbar';

import './App.css';

import { CTX } from 'context/Store';

function App() {
  const [pokemonList, setPokemonList] = useState(null);
  const [currentPokedexPokemon, setCurrentPokedexPokemon] = useState(null);
  const [appState, updateState] = useContext(CTX);

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
      {appState.currentPokemon && <Pokedex />}
      {pokemonList && <PokemonList pokemonList={pokemonList} />}
    </>
  );
}

export default App;
