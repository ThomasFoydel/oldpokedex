import React from 'react';
import IndividualPokemon from 'components/IndividualPokemon/IndividualPokemon';

export default function PokemonList({ pokemonList }) {
  return (
    <div className='pokemon-list-container'>
      <div className='pokemon-list'>
        {pokemonList &&
          pokemonList.map((pokemon, i) => {
            const nextPokemon = i > 1 && pokemonList[i - 1].id;
            const prevPokemon =
              i < pokemonList.length - 1 && pokemonList[i + 1].id;

            return (
              <IndividualPokemon
                key={pokemon.number}
                pokemon={pokemon}
                nextPokemon={nextPokemon}
                prevPokemon={prevPokemon}
              />
            );
          })}
      </div>
    </div>
  );
}
