import React, { useContext } from 'react';
import { CTX } from 'context/Store';

import './IndividualPokemon.scss';
import spritesArray from '../../imgs/sprites/index';

export default function IndividualPokemon({ pokemon }) {
  const [appState, updateState] = useContext(CTX);
  const { name, number, id } = pokemon;
  const pokemonIndex = Number(number);

  return (
    <div className='pokemon-card'>
      <h1 className='pokemon-card-name'>{name}</h1>
      <img
        className='pokemon-card-image'
        src={spritesArray[pokemonIndex - 1]}
        alt={`${name} sprite`}
      />
      <br />
      <button
        className='pokemon-card-detailsbutton'
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
