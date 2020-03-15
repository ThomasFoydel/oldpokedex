import React, { useContext } from 'react';
import PokemonSprite from 'components/Pokedex/PokemonSprite';
import spritesArray from '../../imgs/sprites/index';

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
        <button
          className={`pokedex-prevnext-button ${!prevPokemon &&
            'inactivebutton'}`}
          onClick={() => {
            if (prevPokemon) {
              updateState({
                type: 'CHANGE_CURRENT_POKEMON',
                payload: {
                  currentPokemonLongId: prevPokemon
                }
              });
            }
          }}
        >
          <i className='fas fa-2x fa-arrow-left'></i>
        </button>

        <button
          className={`pokedex-prevnext-button ${!nextPokemon &&
            'inactivebutton'}`}
          onClick={() => {
            if (nextPokemon) {
              updateState({
                type: 'CHANGE_CURRENT_POKEMON',
                payload: {
                  currentPokemonLongId: nextPokemon
                }
              });
            }
          }}
        >
          <i className='fas fa-2x fa-arrow-right'></i>
        </button>
      </div>
      <i
        className='fas fa-2x fa-times pokedex-close-button'
        onClick={() => updateState({ type: 'CLEAR_CURRENT_POKEMON' })}
      ></i>
      <h1 className='pokedex-name'>{name}</h1>
      <div className='pokedex-spritebackground' />
      <PokemonSprite pokemonNumber={Number(number) - 1} name={name} />
      <p className='pokedex-classification'>{classification}</p>
      <div className='pokedex-infobox'>
        <div className='pokedex-types'>
          <b>{types.length > 1 ? `Types:` : `Type:`} </b>
          {types.map((type, i) => (
            <span key={i}>
              {type}
              {i < types.length - 1 ? ', ' : ''}
            </span>
          ))}
        </div>

        {attacks.fast && (
          <div>
            <b>Fast Attacks:</b>{' '}
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
            <b>Special Attacks:</b>{' '}
            {attacks.special.map((attack, i) => (
              <span key={i}>
                {attack.name}
                {i < attacks.special.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
        )}

        <div>
          <b>Resistant To:</b>{' '}
          {resistant.map((individualResistance, i) => (
            <span key={i}>
              {individualResistance}
              {i < resistant.length - 1 ? ', ' : ''}
            </span>
          ))}
        </div>

        <div>
          <b>Weaknesses:</b>{' '}
          {weaknesses.map((weakness, i) => (
            <span key={i}>
              {weakness}
              {i < weaknesses.length - 1 ? ', ' : ''}
            </span>
          ))}
        </div>

        <p>
          <b>Max HP:</b> {maxHP}
        </p>

        <p>
          <b>Max CP:</b> {maxCP}
        </p>

        <p>
          <b>Flee Rate:</b> {fleeRate}
        </p>

        <p>
          <b>Weight:</b> {weight.minimum} - {weight.maximum}
        </p>
        <p>
          <b>Height:</b> {height.minimum} - {height.maximum}
        </p>

        {evolutionRequirements && (
          <p>
            <b>Evolution Requirements:</b> {evolutionRequirements.amount}{' '}
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
                src={spritesArray[Number(evolution.number) - 1]}
              />
            </div>
          ))
        ) : (
          <p className='pokedex-finalevolution'>Final Evolution</p>
        )}
      </div>
    </div>
  );
}
