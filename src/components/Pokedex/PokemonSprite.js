import React, { useState, useEffect } from 'react';
import { useTransition, animated, config } from 'react-spring';
import spritesArray from 'imgs/sprites/index';

const slides = spritesArray.map((sprite, i) => {
  return { id: i, url: sprite };
});

const PokemonSprite = ({ name, pokemonNumber }) => {
  const [index, setIndex] = useState(0);
  const transitions = useTransition(slides[index], item => item.id, {
    from: { position: 'absolute', opacity: 0, left: 500 },
    enter: { opacity: 1, left: 0 },
    leave: { opacity: 0, left: -500 },
    config: config.molasses
  });
  useEffect(() => {
    setIndex(pokemonNumber);
  }, [pokemonNumber]);

  return transitions.map(({ item, props, key }) => {
    // console.log('ITEM: ', item);
    return (
      <animated.div
        key={key}
        class='pokemonsprite-animated'
        style={{
          ...props
        }}
      >
        <img src={item.url} className='pokemonsprite-sprite' />
      </animated.div>
    );
  });
};

export default PokemonSprite;
