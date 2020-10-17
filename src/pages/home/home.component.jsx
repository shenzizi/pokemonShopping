import React, {
  useEffect,
} from 'react';

import {
  Link,
} from "react-router-dom";

import {
  useDispatch,
  useSelector
} from 'react-redux';

import { fetchPokemonList, } from '../../actions/pokemonListAction';

import CollectionOverView from '../../components/collection-overview/collection-overview.component';

import './home.styles.css';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPokemonList());
  }, [dispatch])

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