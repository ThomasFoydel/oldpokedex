import React, { useState, useEffect, useContext } from 'react';
import ApolloClient, { gql } from 'apollo-boost';
import Pokedex from 'components/Pokedex/Pokedex';

import { CTX } from 'context/Store';

export default function PokedexContainer({ pokemonList }) {
  const [appState, updateState] = useContext(CTX);
  const [fetchedPokemon, setFetchedPokemon] = useState(null);

  useEffect(() => {
    const client = new ApolloClient({
      uri: 'https://graphql-pokemon.now.sh/'
    });

    client
      .query({
        query: gql`{ 
            pokemon(id: "${appState.currentPokemonLongId}") {
              id
              number
              name
              classification
              types
              resistant
              weaknesses
              fleeRate
              maxCP
              maxHP
              image
              evolutionRequirements {
                  amount
                  name
              }
              attacks {
                special {
                  name
                  type
                  damage
                }
                fast {
                  name
                  type
                  damage
                }
              }
              weight {
                  minimum
                  maximum
              }
              height {
                  minimum
                  maximum
              }
              evolutions {
                id
                number
                name
              }
            }
          }`
      })
      .then(result => {
        setFetchedPokemon(result.data.pokemon);
      })
      .catch(err => console.log('pokedex fetch error. error: ', err));
  }, [appState.currentPokemonLongId, appState.currentPokemonNumber]);

  return (
    <>
      {fetchedPokemon && (
        <Pokedex pokemonData={fetchedPokemon} pokemonList={pokemonList} />
      )}
    </>
  );
}
