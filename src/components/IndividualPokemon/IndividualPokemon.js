import React from 'react';

import './IndividualPokemon.css';
export default function IndividualPokemon({ pokemon }) {
  const { name, number } = pokemon;
  const pokemonIndex = Number(number);
  console.log('poke: ', pokemon);
  return (
    <div className='pokemon-card'>
      {/* blah blah blah */}
      <h1>{name}</h1>
      <p>{number}</p>
      <img
        className='pokemon-card-image'
        src={`imgs/sprites/${pokemonIndex}.png`}
      />
    </div>
  );
}
