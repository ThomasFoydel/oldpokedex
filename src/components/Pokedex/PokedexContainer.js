import React, { useState, useEffect, useContext } from 'react';
import ApolloClient, { gql } from 'apollo-boost';
import Pokedex from 'components/Pokedex/Pokedex';

import { CTX } from 'context/Store';

export default function PokedexContainer() {
  const [appState, updateState] = useContext(CTX);
  const [fetchedPokemon1, setFetchedPokemon1] = useState(null);
  const [fetchedPokemon2, setFetchedPokemon2] = useState(null);

  console.log('sss: ', appState.currentPokemonNumber);

  useEffect(() => {
    const client1 = new ApolloClient({
      uri: 'https://graphql-pokemon.now.sh/'
    });

    const client2 = new ApolloClient({
      uri: 'https://pokeapi-graphiql.herokuapp.com/'
    });

    client1
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
        setFetchedPokemon1(result.data.pokemon);
      })
      .catch(err => console.log('pokedex fetch error. error: ', err));

    client2
      .query({
        query: gql`
          {
            pokemon(number: 300) {
              name
              created
              attack
              defense
              sp_atk
              sp_def
              speed
              total
              weight
              species
              catch_rate
              egg_cycles
              ev_yield
              exp
              growth_rate
              happiness
              height
              hp
              male_female_ratio
              modified
            }
          }
        `
      })
      .then(result => {
        setFetchedPokemon2(result.data.pokemon);
        console.log('RESULT: ', result.data.pokemon);
      })
      .catch(err => console.log('pokedex fetch error. error: ', err));
  }, [appState.currentPokemonLongId, appState.currentPokemonNumber]);

  return (
    <div className='pokedex'>
      {fetchedPokemon1 && fetchedPokemon2 && (
        <Pokedex
          pokemonData1={fetchedPokemon1}
          pokemonData2={fetchedPokemon2}
        />
      )}
    </div>
  );
}
