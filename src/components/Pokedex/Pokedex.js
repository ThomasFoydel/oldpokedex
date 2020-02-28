import React, { useContext } from 'react';
import { CTX } from 'context/Store';

import './Pokedex.scss';

export default function Pokedex({ pokemonData, pokemonList }) {
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
  } = pokemonData;

  const i = Number(number);
  const prevPokemon = i > 1 && pokemonList[i - 2].id;
  const nextPokemon = i < pokemonList.length && pokemonList[i].id;

  return (
    <div className='pokedex'>
      <div className='pokedex-prevnext-buttons'>
        {prevPokemon && (
          <button
            className='pokedex-prevnext-button'
            onClick={() =>
              updateState({
                type: 'CHANGE_CURRENT_POKEMON',
                payload: {
                  currentPokemonLongId: prevPokemon
                }
              })
            }
          >
            prev
          </button>
        )}
        {nextPokemon && (
          <button
            className='pokedex-prevnext-button'
            onClick={() =>
              updateState({
                type: 'CHANGE_CURRENT_POKEMON',
                payload: {
                  currentPokemonLongId: nextPokemon
                }
              })
            }
          >
            next
          </button>
        )}
      </div>
      <i
        className='fas fa-2x fa-times pokedex-close-button'
        onClick={() => updateState({ type: 'CLEAR_CURRENT_POKEMON' })}
      ></i>
      <h1 className='pokedex-name'>{name}</h1>
      <img
        alt={`${name} sprite`}
        className='pokedex-sprite'
        src={`/imgs/sprites/${Number(number)}.png`}
      />
      <p className='pokedex-classification'>{classification}</p>
      <div className='pokedex-infobox'>
        <div className='pokedex-types'>
          {types.length > 1 ? `Types:` : `Type:`}{' '}
          {types.map((type, i) => (
            <span key={i}>
              {type}
              {i < types.length - 1 ? ', ' : ''}
            </span>
          ))}
        </div>

        {attacks.fast && (
          <div>
            Fast Attacks:{' '}
            {attacks.fast.map((attack, i) => (
              <span key={i}>
                {attack.name}
                {i < attacks.fast.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
        )}

        {attacks.special && (
          <div>
            Special Attacks:{' '}
            {attacks.special.map((attack, i) => (
              <span key={i}>
                {attack.name}
                {i < attacks.special.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
        )}

        <div>
          Resistant To:{' '}
          {resistant.map((individualResistance, i) => (
            <span key={i}>
              {individualResistance}
              {i < resistant.length - 1 ? ', ' : ''}
            </span>
          ))}
        </div>

        <div>
          Weaknesses:{' '}
          {weaknesses.map((weakness, i) => (
            <span key={i}>
              {weakness}
              {i < weaknesses.length - 1 ? ', ' : ''}
            </span>
          ))}
        </div>

        {/* <div className='flex'> */}
        <p>max HP: {maxHP}</p>
        <p>max CP: {maxCP}</p>
        {/* </div> */}
        <p>flee rate: {fleeRate}</p>

        <p>
          weight: {weight.minimum} - {weight.maximum}
        </p>
        <p>
          height: {height.minimum} - {height.maximum}
        </p>

        {evolutionRequirements && (
          <p>
            evolution requirements: {evolutionRequirements.amount}{' '}
            {evolutionRequirements.name}
          </p>
        )}
      </div>
      <div className='pokedex-evolutions'>
        {evolutions ? (
          evolutions.map((evolution, i) => (
            <div
              key={i}
              className='pokedex-evolution'
              onClick={() =>
                updateState({
                  type: 'CHANGE_CURRENT_POKEMON',
                  payload: {
                    currentPokemonLongId: evolution.id
                  }
                })
              }
            >
              <p className='pokedex-evolution-name'>{evolution.name}</p>
              <img
                alt={`${evolution.name} sprite`}
                className='pokedex-evolution-sprite'
                src={`/imgs/sprites/${Number(evolution.number)}.png`}
              />
            </div>
          ))
        ) : (
          <p>No further evolutions</p>
        )}
      </div>
    </div>
  );
}
