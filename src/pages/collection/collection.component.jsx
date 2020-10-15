import React from 'react';

import { withRouter } from 'react-router-dom';

import CollectionOverView from '../../components/collection-overview/collection-overview.component';
import Query from '../query/query.component';

const Collection = ({ match }) => {
  const url = `https://pokeapi.co/api/v2/ability/${match.params.category}`
  // const url = `https://pokeapi.co/api/v2/ability/suction-cu`

  const transformData = (data) => {
    let obj = {};
    data.pokemon && data.pokemon.map(d => {
      const id = d.pokemon.url.match(/pokemon(.*)/g)[0].match(/\d+/g)[0];
      obj[id] = { name: d.pokemon.name, id, category: match.params.category };
    })

    const pokemons = obj;

    return pokemons;
  }

  return (
    <div>
      Collections
      <Query url={url} transformData={transformData}>
        {({ data }) => <CollectionOverView pokemons={data} />}
      </Query>
    </div >
  )
}


export default withRouter(Collection);