import React from 'react';

import './IndividualPokemon.css';
export default function IndividualPokemon({ pokemon }) {
  const { name, number } = pokemon;
  const pokemonIndex = Number(number);
  console.log('poke: ', pokemon);
  return (
    <div className='pokemon-card'>
      <h1 className='pokemon-card-name'>{name}</h1>
      <img
        className='pokemon-card-image'
        src={`imgs/sprites/${pokemonIndex}.png`}
      />
      <br />
      <button>details</button>
    </div>
  );
}
