import React, { useContext } from 'react';
import { NotifyContext } from '../../App';

import './cart.styles.css';

const Cart = () => {
  const { notifyDispatch } = useContext(NotifyContext);

  const handleClick = () => {
    const id = new Date().valueOf();
    notifyDispatch({
      type: 'ADD_NOTIFICATION',
      payload: { [id]: { message: 'show', id } }
    });

    setTimeout(() => {
      notifyDispatch({ type: 'REMOVE_NOTIFICATION', id })
    }, 3000);
  }

  return (
    <>
      <div className='cart'>cart</div>
      <button onClick={handleClick}>show notification</button>
    </>
  )
}

export default Cart;