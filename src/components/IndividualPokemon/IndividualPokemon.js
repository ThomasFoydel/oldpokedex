import React from 'react';

import './IndividualPokemon.css';
export default function IndividualPokemon({ pokemon, setCurrent }) {
  const { name, number, id } = pokemon;
  const pokemonIndex = Number(number);
  const handleSelect = () => {
    setCurrent(id);
  };
  return (
    <div className='pokemon-card'>
      <h1 className='pokemon-card-name'>{name}</h1>
      <img
        className='pokemon-card-image'
        src={`imgs/sprites/${pokemonIndex}.png`}
      />
      <br />
      <button onClick={handleSelect}>details</button>
    </div>
  );
}
