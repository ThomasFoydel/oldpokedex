import React, { useState, useEffect, useContext } from 'react';
import ApolloClient, { gql } from 'apollo-boost';

import PokemonList from 'components/PokemonList/PokemonList';
import PokedexContainer from 'components/Pokedex/PokedexContainer';
import Navbar from 'components/Navbar/Navbar';

import './App.scss';

import { CTX } from 'context/Store';

function App() {
  const [pokemonList, setPokemonList] = useState(null);
  const [appState] = useContext(CTX);

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
      {appState.currentPokemonLongId && appState.currentPokemonNumber && (
        <PokedexContainer />
      )}
      {pokemonList && <PokemonList pokemonList={pokemonList} />}
    </>
  );
}

export default App;
