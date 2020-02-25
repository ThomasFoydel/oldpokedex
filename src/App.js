import React, { useState, useEffect } from 'react';
import PokemonList from 'components/PokemonList/PokemonList';
import { gql } from 'apollo-boost';
import './App.css';
import ApolloClient from 'apollo-boost';

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
    <div className='App'>
      {pokemonList && <PokemonList pokemonList={pokemonList} />}
    </div>
  );
}

export default App;
