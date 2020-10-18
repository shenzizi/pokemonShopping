export const FETCH_POKEMON_SUCCESS = 'FETCH_POKEMON_SUCCESS';
export const FETCH_POKEMON_FAIL = 'FETCH_POKEMON_FAIL';
export const FETCH_POKEMON_START = 'FETCH_POKEMON_START';

const transformData = resp => {
  const fields = ['name', 'weight', 'height', 'sprites', 'types', 'abilities', 'id'];
  let newData = {};
  for (const key in resp) {
    if (fields.includes(key)) {
      newData[key] = resp[key]
    }
  }

  return { [resp.id]: newData };
}

export const fetchPokemon = (id) => {
  return {
    types: [FETCH_POKEMON_START, FETCH_POKEMON_SUCCESS, FETCH_POKEMON_FAIL],
    shouldCallAPI: (state) => !state.pokemon[id],
    callAPI: () => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(resp => resp.json()),
    payload: { id },
    transformData
  }
}
