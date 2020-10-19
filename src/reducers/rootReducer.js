import { combineReducers } from 'redux';

import pokemonCategoryReducer from './pokemonCategoryReducer';
import pokemonListReducer from './pokemonListReducer';
import pokemonReducer from './pokemonReducer';
import notificationReducer from './notificationReducer';

const rootReducer = combineReducers({
  pokemonCategory: pokemonCategoryReducer,
  pokemonList: pokemonListReducer,
  pokemon: pokemonReducer,
  notification: notificationReducer
})

export default rootReducer;