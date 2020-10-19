export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

export const showNotification = ({ id, message }) => ({
  type: SHOW_NOTIFICATION,
  id,
  message
})

export const removeNotification = (id) => ({
  type: REMOVE_NOTIFICATION,
  id
})