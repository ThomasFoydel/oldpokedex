// import React, { useState, useEffect } from 'react';
// import { useTransition, animated, config } from 'react-spring';
// import spritesArray from 'imgs/sprites/index';

// export default function PokemonSprite({ name, pokemonNumber }) {
//   const [currentPokemonNumber, setCurrentPokemonNumber] = useState();
//   useEffect(() => {
//     console.log('use effect');
//     setCurrentPokemonNumber(pokemonNumber - 1);
//   }, [pokemonNumber]);

//   const mappedArray = spritesArray.map((sprite, i) => {
//     return style => (
//       <animated.div key={i} style={{ ...style }}>
//         <img
//           alt={`${name} sprite`}
//           className='pokedex-sprite'
//           src={spritesArray[currentPokemonNumber]}
//         />
//       </animated.div>
//     );
//   });

//   const transitions = useTransition(mappedArray, {
//     from: { opacity: 0, left: -500 },
//     enter: { opacity: 1, left: 0 },
//     leave: { opacity: 0, left: 500 },
//     config: config.molasses
//   });

//   return transitions.map(({ item, key, props }) => item && item(props));
// }

import React, { useState, useEffect } from 'react';
import { useTransition, animated, config } from 'react-spring';
import spritesArray from 'imgs/sprites/index';

const slides = spritesArray.map((sprite, i) => {
  return { id: i, url: sprite };
});

// [
//   {
//     id: 0,
//     url:
//       'photo-1544511916-0148ccdeb877?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1901&q=80i'
//   },
//   {
//     id: 1,
//     url:
//       'photo-1544572571-ab94fd872ce4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1534&q=80'
//   },
//   {
//     id: 2,
//     url: 'reserve/bnW1TuTV2YGcoh1HyWNQ_IMG_0207.JPG?ixlib=rb-1.2.1&w=1534&q=80'
//   },
//   { id: 3, url: 'photo-1540206395-68808572332f?ixlib=rb-1.2.1&w=1181&q=80' }
// ];

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
          // backgroundImage: `url(https://images.unsplash.com/${item.url}&auto=format&fit=crop)`
        }}
      >
        <img src={item.url} className='pokemonsprite-sprite' />
      </animated.div>
    );
  });
};

export default PokemonSprite;
