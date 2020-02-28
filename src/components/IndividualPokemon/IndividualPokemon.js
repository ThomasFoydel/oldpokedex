import React, { useContext } from 'react';
import { CTX } from 'context/Store';

import './IndividualPokemon.css';
export default function IndividualPokemon({ pokemon }) {
  const [appState, updateState] = useContext(CTX);
  const { name, number, id } = pokemon;
  const pokemonIndex = Number(number);

  return (
    <div className='pokemon-card'>
      <h1 className='pokemon-card-name'>{name}</h1>
      <img
        className='pokemon-card-image'
        src={`imgs/sprites/${pokemonIndex}.png`}
        alt={`${name} sprite`}
      />
      <br />
      <button
        onClick={() =>
          updateState({
            type: 'CHANGE_CURRENT_POKEMON',
            payload: {
              currentPokemonLongId: id
            }
          })
        }
      >
        details
      </button>
    </div>
  );
}
