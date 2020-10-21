import React, { useContext } from 'react';
import { NotifyContext } from '../../App';

import './notifcation.styles.css';

const Notification = () => {
  const { notification, notifyDispatch } = useContext(NotifyContext);
  console.log('render Notification component');

  const handleClick = (id) => {
    notifyDispatch(
      { type: 'REMOVE_NOTIFICATION', id }
    );
  }

  return (
    <div className={`notifications ${Object.keys(notification).length >= 1 ? 'show' : 'none'} `}>
      {Object.values(notification).map((n, idx) => (
        <div
          key={n.id}
          className={`notify n${idx}`}
        >
          {n.message} {n.id}
          <button onClick={() => handleClick(n.id)}>X</button>
        </div>
      ))}
    </div>
  )
}

export default Notification;