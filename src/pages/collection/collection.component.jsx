import React, {
  useEffect,
  useCallback
} from 'react';
import {
  withRouter,
  useHistory
} from 'react-router-dom';
import {
  useDispatch,
  useSelector
} from 'react-redux';

import { fetchPokemonCategorySuccess } from '../../action/actions';

import CollectionOverView from '../../components/collection-overview/collection-overview.component';
import { fetchPokemonCategoryStart } from '../../action/actions';


const Collection = ({ match }) => {
  let history = useHistory();
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(state => state.pokemonCategory);

  const transformData = useCallback((data) => {
    let obj = {};
    data.pokemon && data.pokemon.map(d => {
      const id = d.pokemon.url.match(/pokemon(.*)/g)[0].match(/\d+/g)[0];
      obj[id] = { name: d.pokemon.name, id, category: match.params.category };
    })

    const pokemons = obj;

    return pokemons;
  }, [match.params.category])

  useEffect(() => {
    dispatch(fetchPokemonCategoryStart());
    const url = `https://pokeapi.co/api/v2/ability/${match.params.category}`;
    fetch(url)
      .then(resp => {
        if (resp.status > 400) {
          history.replace(history.location.pathname, {
            errorStatusCode: resp.status
          })
        }

        return resp.json()
      })
      .then(data => dispatch(fetchPokemonCategorySuccess(transformData(data))))
  }, [dispatch, history, match.params.category, transformData])


  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <div>error</div>
  }

  return (
    <div>
      Collections
      <CollectionOverView pokemons={data} />
    </div >
  )
}

export default withRouter(Collection);