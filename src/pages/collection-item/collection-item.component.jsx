import React, {
  useEffect,
  useCallback
} from 'react';

import {
  useParams,
  useHistory
} from 'react-router-dom';

import {
  useDispatch,
  useSelector
} from 'react-redux';

import { fetchPokemonStart, fetchPokemonSuccess } from '../../action/actions';

import './collection-item.styles.css';

const CollectionItem = () => {
  let history = useHistory();
  let { id } = useParams();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.pokemon);

  const transformData = useCallback((resp) => {
    const fields = ['name', 'weight', 'height', 'sprites', 'types', 'abilities', 'id'];
    let newData = {};
    for (const key in resp) {
      if (fields.includes(key)) {
        newData[key] = resp[key]
      }
    }
    return newData;
  }, [])

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    dispatch(fetchPokemonStart());
    fetch(url)
      .then(resp => {
        if (resp.status > 400) {
          history.replace(history.location.pathname, {
            errorStatusCode: resp.status
          })
        }

        return resp.json()
      })
      .then(data => dispatch(fetchPokemonSuccess(transformData(data))))
  }, [dispatch, history, id, transformData])

  const handleAddToCart = () => {
    console.log('handleAddToCart');
  }

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <div>error...</div>
  }

  return (

    <div>
      <img src={`https://pokeres.bastionbot.org/images/pokemon/${data.id}.png`} width={200} />
      <div>
        <img src={data.sprites.front_default} alt='sprites.front_default' />
        <img src={data.sprites.back_default} alt='sprites.back_default' />
        <img src={data.sprites.front_shiny} alt='sprites.front_shiny' />
        <img src={data.sprites.back_shiny} alt='sprites.back_shiny' />
      </div>
      <div>name:{data.name}</div>
      <div>height:{data.height}</div>
      <div>weight:{data.weight}</div>
      <div>abilities:{data.abilities.map(d => <p key={d.ability.name}>{d.ability.name}</p>)}</div>
      <div>types:{data.types.map(d => <p key={d.type.name}>{d.type.name}</p>)}</div>

      <div>
        <button onClick={handleAddToCart}>ADD TO CART</button>
        <button onClick={() => history.goBack()}>BACK</button>
      </div>

    </div >



  )
}

export default CollectionItem;