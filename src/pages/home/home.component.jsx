import React, {
  useEffect,
  useCallback
} from 'react';

import { Link, useHistory } from "react-router-dom";

import {
  useDispatch,
  useSelector
} from 'react-redux';

import {
  fetchPokemonCategoryStart,
  fetchPokemonCategorySuccess
} from '../../action/actions';

import CollectionOverView from '../../components/collection-overview/collection-overview.component';

import './home.styles.css';

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const transformData = useCallback((resp) => {
    let obj = {};
    resp.map(data => {
      let pokemonCollection = {};
      data.pokemon.slice(0, 5).map(d => {
        const id = d.pokemon.url.match(/pokemon(.*)/g)[0].match(/\d+/g)[0];
        pokemonCollection[id] = { name: d.pokemon.name, id, category: data.name }
      })
      obj[data.name] = pokemonCollection;
    });
    return obj;
  }, [])


  useEffect(() => {
    dispatch(fetchPokemonCategoryStart());
    const url = 'https://pokeapi.co/api/v2/ability/?limit=20&offset=20';
    fetch(url)
      .then(resp => {
        if (resp.status > 400) {
          history.replace(history.location.pathname, {
            errorStatusCode: resp.status
          })
        }
        return resp.json()
      })
      .then(data => {
        const urls = data.results.slice(0, 10).map(p => p.url)
        let requests = urls.map(url => fetch(url));
        Promise.all(requests)
          .then(resp => {
            return Promise.all(resp.map(d => d.json()))
          })
          .then(data => {
            dispatch(fetchPokemonCategorySuccess(transformData(data)))
          })
      })
  }, [dispatch, history, transformData])

  const { data, loading, error } = useSelector(state => state.pokemonCategory);

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <div>ERROR!</div>
  }

  return (
    <div>
      Pokemon
      {Object.entries(data).map(([key, value]) => {
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