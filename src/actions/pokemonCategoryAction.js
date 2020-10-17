export const FETCH_POKEMON_CATEGORY_SUCCESS = 'FETCH_POKEMON_CATEGORY_SUCCESS';
export const FETCH_POKEMON_CATEGORY_FAIL = 'FETCH_POKEMON_CATEGORY_FAIL';
export const FETCH_POKEMON_CATEGORY_START = 'FETCH_POKEMON_CATEGORY_START';

const transformEachData = ({ data }) => {
  let obj = {};
  data.pokemon && data.pokemon.map(d => {
    const id = d.pokemon.url.match(/pokemon(.*)/g)[0].match(/\d+/g)[0];
    obj[id] = { name: d.pokemon.name, id, category: [data.name] };
  })

  const pokemons = obj;

  return { [data.name]: pokemons };
}

const transformData = ({ data }) => {
  if (Array.isArray(data)) {
    let multipleCategories = {};
    for (let d of data) {
      multipleCategories = { ...multipleCategories, ...transformEachData({ data: d }) }
    }
    return multipleCategories;
  } else {
    return transformEachData({ data });
  }
}

export const fetchPokemonCategory = category => async dispatch => {
  try {
    dispatch({
      type: FETCH_POKEMON_CATEGORY_START
    })

    if (Array.isArray(category)) {
      let categories = category.map(c => `https://pokeapi.co/api/v2/ability/${c}`);
      let requests = categories.map(category => fetch(category));
      Promise.all(requests)
        .then(resp => {
          return Promise.all(resp.map(d => d.json()))
        })
        .then(data => {
          dispatch({
            type: FETCH_POKEMON_CATEGORY_SUCCESS,
            data: transformData({ data })
          })
        })

    } else {
      const resp = await fetch(`https://pokeapi.co/api/v2/ability/${category}`)
      const data = await resp.json();
      dispatch({
        type: FETCH_POKEMON_CATEGORY_SUCCESS,
        data: transformData({ data })
      })
    }


  } catch (error) {
    console.log('error', error);
    dispatch({
      type: FETCH_POKEMON_CATEGORY_FAIL,
    })
  }
}


