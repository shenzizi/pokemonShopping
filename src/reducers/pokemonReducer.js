import {
  FETCH_POKEMON_SUCCESS,
  FETCH_POKEMON_FAIL,
  FETCH_POKEMON_START
} from '../actions/pokemonAction';

const initialState = {
  loading: true,
  data: null,
  error: null
}

function pokemonReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POKEMON_START:
      return {
        ...state,
        loading: true
      }
    case FETCH_POKEMON_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          ...action.data
        }
      }
    case FETCH_POKEMON_FAIL:
      return {
        ...state,
        loading: false,
        error: 'error'
      }
    default:
      return state;
  }
}

export default pokemonReducer;