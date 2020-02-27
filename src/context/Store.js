import React from 'react';

const CTX = React.createContext();

export { CTX };

export function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_CURRENT_POKEMON':
      return {
        ...state,
        currentPokemonLongId: action.payload.currentPokemonLongId,
        currentPokemonNumber: action.payload.currentPokemonNumber
      };
    case 'CLEAR_CURRENT_POKEMON':
      return {
        ...state,
        currentPokemonLongId: '',
        currentPokemonNumber: ''
      };
    default:
      throw Error('reducer error');
  }
}

export default function Store(props) {
  const stateHook = React.useReducer(reducer, {
    currentPokemon: ''
  });

  return <CTX.Provider value={stateHook}>{props.children}</CTX.Provider>;
}
