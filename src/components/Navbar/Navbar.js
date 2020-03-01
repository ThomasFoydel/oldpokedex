import React from 'react';
import './Navbar.scss';
import pokeball from 'imgs/pokeball/pokeball.png';
export default function Navbar() {
  return (
    <div className='navbar'>
      <div className='navbar-left'>
        <img className='navbar-pokeball' src={pokeball} alt='pokeball' />
        <h1 className='navbar-item'>pokedex</h1>
      </div>
      <div className='navbar-portfoliolink'>
        by Thomas Foydel 2020{' '}
        <a href='https://thomasfoydel.com'>back to my portfolio</a>
      </div>
    </div>
  );
}
