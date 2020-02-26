import React from 'react';
import IndividualPokemon from 'components/IndividualPokemon/IndividualPokemon';

export default function PokemonList({ pokemonList, setCurrent }) {
  return (
    <div className='pokemon-list-container'>
      <div className='pokemon-list'>
        {pokemonList &&
          pokemonList.map(pokemon => (
            <IndividualPokemon
              key={pokemon.number}
              pokemon={pokemon}
              style={{ background: 'blue' }}
              setCurrent={setCurrent}
            />
          ))}
      </div>
    </div>
  );
}
