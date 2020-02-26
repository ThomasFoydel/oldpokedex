import React, { useState, useEffect, useContext } from 'react';
import ApolloClient, { gql } from 'apollo-boost';

import './Pokedex.css';

import { CTX } from 'context/Store';

export default function Pokedex() {
  const [appState, updateState] = useContext(CTX);
  const pokemon = appState.currentPokemon;
  const [fetchedPokemon, setFetchedPokemon] = useState(null);

  useEffect(() => {
    const client = new ApolloClient({
      uri: 'https://graphql-pokemon.now.sh/'
    });

    client
      .query({
        query: gql`{
            pokemon(id: "${pokemon}") {
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
                weight {
                  minimum
                  maximum
                }
                attacks {
                  fast {
                    name
                    type
                    damage
                  }
                }
              }
            }
          }`
      })
      .then(result => {
        setFetchedPokemon(result.data.pokemon);
      })
      .catch(err => console.log('pokedex fetch error. error: ', err));
  }, [pokemon]);

  fetchedPokemon &&
    console.log(
      fetchedPokemon.name,
      'fetchedPokemon.attacks: ',
      fetchedPokemon
    );

  return (
    <div className='pokedex'>
      {fetchedPokemon && <h1>{fetchedPokemon.name}</h1>}
      {fetchedPokemon &&
        fetchedPokemon.attacks.special &&
        fetchedPokemon.attacks.special.map((attack, i) => (
          <h4 key={i}>{attack.name}</h4>
        ))}
    </div>
  );
}
