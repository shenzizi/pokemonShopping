import React, {
  useState,
  useEffect
} from 'react';
import { useParams, useHistory } from 'react-router-dom';

import './collection-item.styles.css';


const CollectionItem = () => {
  let history = useHistory();
  let { id } = useParams();

  const [pokemonFeatures, setpokemonFeatures] = useState(null);
  console.log(id);
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(resp => resp.json())
      .then(data => {
        console.log(data, data.name, data.weight, data.height, data.sprites, data.types, data.abilities);
        const fields = ['name', 'weight', 'height', 'sprites', 'types', 'abilities'];
        let newData = {};
        for (const key in data) {
          if (fields.includes(key)) {
            newData[key] = data[key]
          }
        }
        console.log('newData', newData);

        setpokemonFeatures(newData)
      })
  }, [id])

  const handleAddToCart = () => {
    console.log('handleAddToCart');
  }

  if (!pokemonFeatures) {
    return <div>loading...</div>
  }

  console.log(pokemonFeatures);

  return (
    <div>
      <img src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`} width={200} />
      <div>
        <img src={pokemonFeatures.sprites.front_default} alt='sprites.front_default' />
        <img src={pokemonFeatures.sprites.back_default} alt='sprites.back_default' />
        <img src={pokemonFeatures.sprites.front_shiny} alt='sprites.front_shiny' />
        <img src={pokemonFeatures.sprites.back_shiny} alt='sprites.back_shiny' />
      </div>
      <div>name:{pokemonFeatures.name}</div>
      <div>height:{pokemonFeatures.height}</div>
      <div>weight:{pokemonFeatures.weight}</div>
      <div>abilities:{pokemonFeatures.abilities.map(d => <p>{d.ability.name}</p>)}</div>
      <div>types:{pokemonFeatures.types.map(d => <p>{d.type.name}</p>)}</div>

      <div>
        <button onClick={handleAddToCart}>ADD TO CART</button>
        <button onClick={() => history.goBack()}>BACK</button>
      </div>

    </div >
  )
}

export default CollectionItem;