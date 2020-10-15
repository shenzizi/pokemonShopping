import React, {
  useState,
  useEffect
} from 'react';

import { Link } from "react-router-dom";

import useQuery from '../../hooks/useQuery';
import useAllQueries from '../../hooks/useAllQueries';

import CollectionOverView from '../../components/collection-overview/collection-overview.component';

import './home.styles.css';

const Home = () => {
  const transformData = (resp) => {
    let obj = {};
    resp.map(data => {
      let pokemonCollection = {};
      data.pokemon.slice(0, 5).map(d => {
        const id = d.pokemon.url.match(/pokemon(.*)/g)[0].match(/\d+/g)[0];
        pokemonCollection[id] = { name: d.pokemon.name, id }
      })
      obj[data.name] = pokemonCollection;
    });

    return obj;
  }

  const [fetchUrls, setFetchUrls] = useState(null);

  const { loading, data, error } = useQuery({ url: 'https://pokeapi.co/api/v2/ability/?limit=20&offset=20' });
  const { loading: pokemonsLoading, data: pokemonsData, error: pokemonsError } = useAllQueries(fetchUrls ? { urls: fetchUrls } : { urls: null });

  useEffect(() => {
    let selectedPokemonsUrls = data && data.results.slice(0, 10).map(p => p.url);
    setFetchUrls(selectedPokemonsUrls);
  }, [data])

  if (loading || pokemonsLoading) {
    return <div>loading...</div>
  }

  if (error || pokemonsError) {
    return <div>ERROR!</div>
  }

  return (
    <div>
      Pokemon
      {Object.entries(transformData(pokemonsData)).map(([key, value]) => {
        return (
          <div key={key}>
            <div className="category">
              <Link to={`/shop/${key}`}>{key}</Link>
            </div>
            <CollectionOverView pokemons={value} />
          </div>
        )
      })}
    </div>
  )
}

export default Home;