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

import { fetchPokemon } from '../../actions/pokemonAction';

import './collection-item.styles.css';

const CollectionItem = () => {
  let history = useHistory();
  let { id } = useParams();
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(state => state.pokemon);

  const fetchData = useCallback(() => {
    dispatch(fetchPokemon(id))
  }, [dispatch, id])

  useEffect(() => {
    fetchData(id);
  }, [fetchData, id])

  const handleAddToCart = () => {
    console.log('handleAddToCart');
  }

  const pokemon = data && data[id];

  if (loading || !pokemon) {
    return <div>loading...</div>
  }

  if (error) {
    return <div>error...</div>
  }

  return (

    <div>
      <img src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`} width={200} />
      <div>
        <img src={pokemon.sprites.front_default} alt='sprites.front_default' />
        <img src={pokemon.sprites.back_default} alt='sprites.back_default' />
        <img src={pokemon.sprites.front_shiny} alt='sprites.front_shiny' />
        <img src={pokemon.sprites.back_shiny} alt='sprites.back_shiny' />
      </div>
      <div>name:{pokemon.name}</div>
      <div>height:{pokemon.height}</div>
      <div>weight:{pokemon.weight}</div>
      <div>abilities:{pokemon.abilities.map(d => <p key={d.ability.name}>{d.ability.name}</p>)}</div>
      <div>types:{pokemon.types.map(d => <p key={d.type.name}>{d.type.name}</p>)}</div>

      <div>
        <button onClick={handleAddToCart}>ADD TO CART</button>
        <button onClick={() => history.goBack()}>BACK</button>
      </div>
    </div >
  )
}

export default CollectionItem;