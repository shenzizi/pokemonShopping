import React from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';

import { removeNotification } from '../../actions/notification';
import './notifcation.styles.css';

const Notification = () => {
  const dispatch = useDispatch();
  const { showNotification } = useSelector(state => state.notification);

  console.log('show', showNotification);

  const handleClick = () => {
    dispatch(removeNotification());
  }

  return (
    <div className={`notification ${showNotification ? 'show' : 'none'} `}>
      <p>show notification</p>
      <button onClick={handleClick}>X</button>
    </div>
  )
}

export default Notification;