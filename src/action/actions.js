export const FETCH_POKEMON_CATEGORY_SUCCESS = 'FETCH_POKEMON_CATEGORY_SUCCESS';
export const FETCH_POKEMON_CATEGORY_FAIL = 'FETCH_POKEMON_CATEGORY_FAIL';
export const FETCH_POKEMON_CATEGORY_START = 'FETCH_POKEMON_CATEGORY_START';

export const FETCH_POKEMON_SUCCESS = 'FETCH_POKEMON_SUCCESS';
export const FETCH_POKEMON_FAIL = 'FETCH_POKEMON_FAIL';
export const FETCH_POKEMON_START = 'FETCH_POKEMON_START';

export function fetchPokemonCategoryStart() {
  return {
    type: FETCH_POKEMON_CATEGORY_START
  }
}

export function fetchPokemonCategorySuccess(data) {
  return {
    type: FETCH_POKEMON_CATEGORY_SUCCESS,
    data
  }
}

export function fetchPokemonCategoryFail(data) {
  return {
    type: FETCH_POKEMON_CATEGORY_FAIL,
  }
}

export function fetchPokemonStart() {
  return {
    type: FETCH_POKEMON_START
  }
}

export function fetchPokemonSuccess(data) {
  return {
    type: FETCH_POKEMON_SUCCESS,
    data
  }
}

export function fetchPokemonFail(data) {
  return {
    type: FETCH_POKEMON_FAIL,
  }
}


