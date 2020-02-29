import React, { useState, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';

export default function PokemonSprite({ name, pokemonNumber }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  const transitions = useTransition(mounted, null, {
    from: { position: 'absolute', opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  return transitions.map(
    ({ item, key, props }) =>
      item && (
        <animated.div key={key} style={props}>
          <img
            alt={`${name} sprite`}
            className='pokedex-sprite'
            src={`/imgs/sprites/${pokemonNumber}.png`}
          />
        </animated.div>
      )
  );
}
