import React, { useState, useEffect, useContext } from 'react';
import ApolloClient, { gql } from 'apollo-boost';
import { useSpring, animated, config } from 'react-spring';
import PokemonList from 'components/PokemonList/PokemonList';
import PokedexContainer from 'components/Pokedex/PokedexContainer';
import Navbar from 'components/Navbar/Navbar';

import './App.scss';

import { CTX } from 'context/Store';

function App() {
  const [appState] = useContext(CTX);
  const [pokemonList, setPokemonList] = useState(null);
  const [loaded, setLoaded] = useState(false);

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
        setLoaded(true);
      });
  }, []);

  const animationProps = useSpring({
    to: {
      position: 'absolute',
      zIndex: 8,
      opacity: appState.currentPokemonLongId ? 1 : 0,
      marginLeft: appState.currentPokemonLongId ? '0px' : '-1000px'
    },
    from: { zIndex: 8, opacity: 0 },
    delay: 225
  });

  return (
    <>
      {loaded ? (
        <>
          <Navbar />
          {/* {appState.currentPokemonLongId && ( */}
          <animated.div style={animationProps}>
            <PokedexContainer pokemonList={pokemonList} />
          </animated.div>
          {/* )} */}
          {pokemonList && <PokemonList pokemonList={pokemonList} />}
        </>
      ) : (
        <img className='pokeball-loader' src={'imgs/loading/pokeball.gif'} />
      )}
    </>
  );
}

export default App;
