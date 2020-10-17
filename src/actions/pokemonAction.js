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

export const fetchPokemon = id => async dispatch => {
  dispatch({ type: FETCH_POKEMON_START });

  try {
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const data = await resp.json();

    dispatch({
      type: FETCH_POKEMON_SUCCESS,
      data: transformData(data),
      id
    });

  } catch {
    dispatch({ type: FETCH_POKEMON_FAIL });

  }
}
