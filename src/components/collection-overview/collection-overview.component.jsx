import React from 'react';

import Pokemon from '../pokemon/pokemon.component';

import './collection-overview.styles.css';

const CollectionOverView = ({ pokemons }) => {
  return (
    <div className="collection-pokemons">
      {Object.values(pokemons).map(pokemon => <Pokemon key={pokemon.id} pokemon={pokemon} />)}
    </div>
  )
}

export default CollectionOverView;

