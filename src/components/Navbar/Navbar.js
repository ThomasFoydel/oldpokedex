import React from 'react';
import './Navbar.scss';

export default function Navbar() {
  return (
    <div className='navbar'>
      <h1 className='navbar-item'>pokedex</h1>
      <div className='navbar-portfoliolink'>
        by Thomas Foydel 2020{' '}
        <a href='https://thomasfoydel.com'>back to my portfolio</a>
      </div>
    </div>
  );
}
