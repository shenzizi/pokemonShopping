import { combineReducers } from 'redux';

import pokemonCategoryReducer from './pokemonCategoryReducer';
import pokemonListReducer from './pokemonListReducer';
import pokemonReducer from './pokemonReducer';

const rootReducer = combineReducers({
  pokemonCategory: pokemonCategoryReducer,
  pokemonList: pokemonListReducer,
  pokemon: pokemonReducer
})

export default rootReducer;