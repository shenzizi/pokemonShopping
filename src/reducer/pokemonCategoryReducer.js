import {
  FETCH_POKEMON_CATEGORY_SUCCESS,
  FETCH_POKEMON_CATEGORY_FAIL,
  FETCH_POKEMON_CATEGORY_START
} from '../action/actions';

const initialState = {
  loading: true,
  data: null,
  error: null
}

function pokemonCategoryReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POKEMON_CATEGORY_START:
      return {
        ...state,
        loading: true
      }
    case FETCH_POKEMON_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data
      }
    case FETCH_POKEMON_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: 'error'
      }
    default:
      return state;
  }
}

export default pokemonCategoryReducer;