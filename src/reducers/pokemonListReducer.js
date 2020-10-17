import {
  FETCH_POKEMON_LIST_SUCCESS,
  FETCH_POKEMON_LIST_FAIL,
  FETCH_POKEMON_LIST_START
} from '../actions/pokemonListAction';

const initialState = {
  loading: true,
  data: null,
  error: null
}

function pokemonListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POKEMON_LIST_START:
      return {
        ...state,
        loading: true
      }
    case FETCH_POKEMON_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          ...action.data
        }
      }
    case FETCH_POKEMON_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: 'error'
      }
    default:
      return state;
  }
}

export default pokemonListReducer;