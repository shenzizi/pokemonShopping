import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import callApi from '../middleware/api';

import rootReducer from '../reducers/rootReducer';


const composeEnhancers =
  typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

let store = createStore(rootReducer,
  composeEnhancers(applyMiddleware(thunk, callApi)));

export default store;

