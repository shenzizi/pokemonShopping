import React from 'react';
import {
  Link
} from 'react-router-dom';

import './pokemon.styles.css';

const Pokemon = ({ pokemon }) => (
  <Link to={`/shop/${pokemon.category}/${pokemon.id}`}>
    <div className="pokemon">
      <img src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`} />
      <div className="pokemon-set">
        <span>{pokemon.name}</span>
        <span>${pokemon.id}</span>
      </div>
    </div>
  </Link>
)

export default Pokemon;