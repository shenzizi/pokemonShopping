import React from 'react';
import { useDispatch } from 'react-redux';
import { showNotification, removeNotification } from '../../actions/notification';

import './cart.styles.css';

const Cart = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(showNotification({ id: new Date().valueOf(), message: 'show notification' }));
    setTimeout(function remove() {
      dispatch(removeNotification());
    }, 2000);
  }
  return (
    <>
      <div className='cart'>cart</div>
      <button onClick={handleClick}>show notification</button>
    </>
  )
}

export default Cart;