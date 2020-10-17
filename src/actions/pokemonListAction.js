import { fetchPokemonCategory } from './pokemonCategoryAction';

export const FETCH_POKEMON_LIST_SUCCESS = 'FETCH_POKEMON_LIST_SUCCESS';
export const FETCH_POKEMON_LIST_FAIL = 'FETCH_POKEMON_LIST_FAIL';
export const FETCH_POKEMON_LIST_START = 'FETCH_POKEMON_LIST_START';

export const fetchPokemonList = () => async dispatch => {
  try {
    dispatch({
      type: FETCH_POKEMON_LIST_START
    })

    const resp = await fetch('https://pokeapi.co/api/v2/ability/?limit=20&offset=20')
    const data = await resp.json();

    const categoryNames = data.results.slice(0, 10).map(p => p.name)

    dispatch(fetchPokemonCategory(categoryNames));

    dispatch({
      type: FETCH_POKEMON_LIST_SUCCESS,
      data
    })
  } catch {
    dispatch({
      type: FETCH_POKEMON_LIST_FAIL,
    })
  }
}
