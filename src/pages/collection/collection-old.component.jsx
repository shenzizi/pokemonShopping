import React from 'react';

import { withRouter } from 'react-router-dom';

import CollectionOverView from '../../components/collection-overview/collection-overview.component';
import useFetch from '../../hooks/useFetch';

const Collection = ({ history, match }) => {
  console.log(history, match);

  // const url = `https://pokeapi.co/api/v2/ability/${match.params.category}`
  const url = `https://pokeapi.co/api/v2/ability/suction-cu`

  const { status, data, error } = useFetch(url);
  console.log(status, data, error);


  if (status === 'fetching') {
    return <div>loading...</div>
  }

  if (error) {
    console.log('error!!!');
    return <div>ERROR!{error}</div>
  }

  let obj = {};
  console.log(data.pokemon);
  data.pokemon && data.pokemon.map(d => {
    const id = d.pokemon.url.match(/pokemon(.*)/g)[0].match(/\d+/g)[0];
    obj[id] = { name: d.pokemon.name, id, category: match.params.category };
  })

  const pokemons = obj;

  console.log(pokemons, obj);

  return (
    <div>
      Collections
      <CollectionOverView pokemons={pokemons} />
    </div >
  )
}


export default withRouter(Collection);