import {
  SHOW_NOTIFICATION,
  REMOVE_NOTIFICATION
} from '../actions/notification';


function notificationReducer(state = {}, action) {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        ...state,
        showNotification: true
      }
    case REMOVE_NOTIFICATION: {
      return {
        ...state,
        showNotification: false
      }
    }
    default:
      return state;
  }
}

export default notificationReducer;
