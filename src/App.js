import React, { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';
import ApolloClient from 'apollo-boost';

import PokemonList from 'components/PokemonList/PokemonList';
import Navbar from 'components/Navbar/Navbar';

import './App.css';

function App() {
  const [pokemonList, setPokemonList] = useState(null);

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
      {pokemonList && <PokemonList pokemonList={pokemonList} />}
    </>
  );
}

export default App;
