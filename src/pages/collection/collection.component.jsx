import React, {
  useEffect,
  useCallback
} from 'react';
import { withRouter, } from 'react-router-dom';
import {
  useDispatch,
  useSelector
} from 'react-redux';

import { fetchPokemonCategory } from '../../actions/pokemonCategoryAction';

import CollectionOverView from '../../components/collection-overview/collection-overview.component';


const Collection = ({ match }) => {
  console.log('render Collection component');
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(state => state.pokemonCategory);


  const fetchData = useCallback((category) => {
    dispatch(fetchPokemonCategory(category))
  }, [dispatch])

  useEffect(() => {
    fetchData(match.params.category)
  }, [fetchData, match.params.category])

  const pokemons = data && data[match.params.category];

  if (loading || !pokemons) {
    return <div>loading...</div>
  }

  if (error) {
    return <div>error</div>
  }

  return (
    <div>
      Collections
      <CollectionOverView pokemons={pokemons} />
    </div >
  )
}

export default withRouter(Collection);