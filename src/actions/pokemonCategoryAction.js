export const FETCH_POKEMON_CATEGORY_SUCCESS = 'FETCH_POKEMON_CATEGORY_SUCCESS';
export const FETCH_POKEMON_CATEGORY_FAIL = 'FETCH_POKEMON_CATEGORY_FAIL';
export const FETCH_POKEMON_CATEGORY_START = 'FETCH_POKEMON_CATEGORY_START';

const transformEachData = (data) => {
  let obj = {};
  data.pokemon && data.pokemon.map(d => {
    const id = d.pokemon.url.match(/pokemon(.*)/g)[0].match(/\d+/g)[0];
    obj[id] = { name: d.pokemon.name, id, category: [data.name] };
  })

  const pokemons = obj;

  return { [data.name]: pokemons };
}

const transformData = (data) => {
  if (Array.isArray(data)) {
    let multipleCategories = {};
    for (let d of data) {
      multipleCategories = { ...multipleCategories, ...transformEachData(d) }
    }
    return multipleCategories;
  } else {
    return transformEachData(data);
  }
}

const fetchAPI = category => {
  if (Array.isArray(category)) {
    let categories = category.map(c => `https://pokeapi.co/api/v2/ability/${c}`);
    let requests = categories.map(category => fetch(category));
    return Promise.all(requests)
      .then(resp => {
        return Promise.all(resp.map(d => d.json()))
      })
  } else {
    return fetch(`https://pokeapi.co/api/v2/ability/${category}`).then(resp => resp.json());
  }
}

export const fetchPokemonCategory = category => ({
  types: [FETCH_POKEMON_CATEGORY_START, FETCH_POKEMON_CATEGORY_SUCCESS, FETCH_POKEMON_CATEGORY_FAIL],
  callAPI: () => fetchAPI(category),
  transformData
})
