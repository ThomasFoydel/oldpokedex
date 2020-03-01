import React, { useState, useContext } from 'react';
import { CTX } from 'context/Store';
import { useSpring, animated, config } from 'react-spring';
import spritesArray from '../../imgs/sprites/index';
import './IndividualPokemon.scss';

export default function IndividualPokemon({ pokemon }) {
  const [appState, updateState] = useContext(CTX);
  const [hover, setHover] = useState(false);
  const { name, number, id } = pokemon;
  const pokemonIndex = Number(number);

  const animationProps = useSpring({
    to: { transform: hover ? 'scale(1.1)' : 'scale(0.85)' },
    config: config.wobbly
  });

  const animationProps2 = useSpring({
    to: { letterSpacing: hover ? '0.3rem' : '0rem' }
  });

  return (
    <div
      className='pokemon-card'
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      onClick={() =>
        updateState({
          type: 'CHANGE_CURRENT_POKEMON',
          payload: {
            currentPokemonLongId: id
          }
        })
      }
    >
      <h1
        className='pokemon-card-name'
        style={{
          transition: 'all 0.3s ease',
          letterSpacing: hover ? '0.7rem' : '0.3rem'
        }}
      >
        {name}
      </h1>

      <animated.div style={animationProps}>
        <img
          className='pokemon-card-image'
          src={spritesArray[pokemonIndex - 1]}
          alt={`${name} sprite`}
        />
      </animated.div>
    </div>
  );
}
