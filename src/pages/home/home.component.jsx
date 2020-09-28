import React, {
  useState,
  useEffect
} from 'react';

import useFetch from '../../hooks/useFetch';

import { Link } from "react-router-dom";

import Pokemon from '../../components/pokemon/pokemon.component';

import './home.styles.css';

const Home = () => {
  const [fetchUrls, setFetchUrls] = useState(null);
  const [pokemon, setPokemon] = useState(null);

  const { status, data, error } = useFetch('https://pokeapi.co/api/v2/ability/?limit=20&offset=20');

  useEffect(() => {
    let selectedPokemons = data.results && data.results.slice(0, 10);
    setFetchUrls(selectedPokemons);
  }, [data.results])


  useEffect(() => {
    if (fetchUrls) {
      let requests = fetchUrls.map(d => fetch(d.url));
      Promise.all(requests)
        .then(data => {
          return Promise.all(data.map(d => d.json()))
        })
        .then(resp => {
          let obj = {};
          resp.map(data => {
            obj[data.name] = data.pokemon.map(d => {
              const id = d.pokemon.url.match(/pokemon(.*)/g)[0].match(/\d+/g)[0];
              return { [id]: { name: d.pokemon.name, id } }
            })
          });

          setPokemon(obj);
        })
    }
  }, [fetchUrls])

  if (status === 'fetching' || !pokemon) {
    return <div>loading...</div>
  }

  if (error) {
    return <div>ERROR!</div>
  }

  return (
    <div>
      Pokemon
      {Object.entries(pokemon).map(([key, value]) => {
        return (
          <div key={key}>
            <div className="category">
              <Link to={`/shop/${key}`}>{key}</Link>
            </div>
            <div className="pokemons">
              {value.slice(0, 5).map(obj =>
                Object.values(obj).map(pokemon =>
                  <Pokemon key={key} pokemon={({ ...pokemon, category: key })} />
                ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Home;