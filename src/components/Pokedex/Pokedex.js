import React, { useContext } from 'react';
import { CTX } from 'context/Store';

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
      <button onClick={() => updateState({ type: 'CLEAR_CURRENT_POKEMON' })} />
      <h1>{name}</h1>
      <p>{classification}</p>
      <div>
        types:
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

      <h6>
        weight: {weight.minimum} - {weight.maximum}
      </h6>
      <h6>
        height: {height.minimum} - {height.maximum}
      </h6>

      <h6>
        {evolutionRequirements.amount} {evolutionRequirements.name}
      </h6>

      <img src={`/imgs/sprites/${Number(number)}.png`} />
      <div className='pokedex-evolutions'>
        {evolutions &&
          evolutions.map(evolution => (
            <div key={evolution.number} className='pokedex-evolution'>
              <p>{evolution.name}</p>
              <img src={`/imgs/sprites/${Number(evolution.number)}.png`} />
            </div>
          ))}
      </div>
    </div>
  );
}
