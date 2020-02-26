import React, { useContext } from 'react';
import { CTX } from 'context/Store';

import './Pokedex.scss';

export default function Pokedex({ pokemon }) {
  const [appState, updateState] = useContext(CTX);

  const {
    name,
    attacks,
    number,
    classification,
    types,
    resistant,
    weaknesses,
    fleeRate,
    maxCP,
    maxHP,
    weight,
    height,
    evolutions,
    evolutionRequirements
  } = pokemon;

  return (
    <div>
      <i
        class='fas fa-2x fa-times pokedex-close-button'
        onClick={() => updateState({ type: 'CLEAR_CURRENT_POKEMON' })}
      ></i>

      <h1 className='pokedex-name'>{name}</h1>
      <img
        alt={`${name} sprite`}
        className='pokedex-sprite'
        src={`/imgs/sprites/${Number(number)}.png`}
      />
      <p className='pokedex-classification'>{classification}</p>
      <div className='pokedex-types'>
        types:{' '}
        {types.map(type => (
          <span key={type}>{type}</span>
        ))}
      </div>

      {attacks.fast && (
        <div>
          fast attacks:{' '}
          {attacks.fast.map((attack, i) => (
            <span key={i}>{attack.name}</span>
          ))}
        </div>
      )}

      {attacks.special && (
        <div>
          special attacks:{' '}
          {attacks.special.map((attack, i) => (
            <span key={i}>{attack.name}</span>
          ))}
        </div>
      )}

      <div>
        resistant to:{' '}
        {resistant.map(resistant => (
          <>
            <span key={resistant}>{resistant}</span>{' '}
          </>
        ))}
      </div>

      <div>
        weaknesses:{' '}
        {weaknesses.map(weaknesses => (
          <span key={weaknesses}>{weaknesses}</span>
        ))}
      </div>

      <p>max HP: {maxHP}</p>
      <p>max CP: {maxCP}</p>
      <p>flee rate: {fleeRate}</p>

      <p>
        weight: {weight.minimum} - {weight.maximum}
      </p>
      <p>
        height: {height.minimum} - {height.maximum}
      </p>

      {evolutionRequirements && (
        <p>
          {evolutionRequirements.amount} {evolutionRequirements.name}
        </p>
      )}

      <div className='pokedex-evolutions'>
        {evolutions &&
          evolutions.map(evolution => (
            <div key={evolution.number} className='pokedex-evolution'>
              <p>{evolution.name}</p>
              <img
                alt={`${evolution.name} sprite`}
                className='pokedex-evolution-sprite'
                src={`/imgs/sprites/${Number(evolution.number)}.png`}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
