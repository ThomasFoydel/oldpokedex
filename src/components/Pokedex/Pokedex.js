import React, { useState, useEffect } from 'react';
import ApolloClient, { gql } from 'apollo-boost';
import './Pokedex.css';

export default function Pokedex({ pokemon, setCurrent }) {
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
              attacks {
                special {
                  name
                  type
                  damage
                }
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

  return (
    <div className='pokedex'>
      {fetchedPokemon && <h1>{fetchedPokemon.name}</h1>}
    </div>
  );
}
