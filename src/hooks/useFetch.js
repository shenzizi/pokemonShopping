import {
  useReducer,
  useEffect
} from 'react';

import { useHistory } from 'react-router-dom';

const useFetch = (url) => {
  let history = useHistory();

  const initialState = {
    status: 'idle',
    error: null,
    data: [],
  };

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'FETCHING':
        return { ...initialState, status: 'fetching' };
      case 'FETCHED':
        return { ...initialState, status: 'fetched', data: action.payload };
      case 'FETCH_ERROR':
        return { ...initialState, status: 'error', error: action.payload };
      default:
        return state;
    }
  }, initialState);


  useEffect(() => {
    dispatch({ type: 'FETCHING' });
    fetch(url)
      .then(resp => {
        console.log(resp);
        if (resp.status > 400) {
          dispatch({ type: 'FETCH_ERROR', payload: resp.status });
        }
        return resp.json()
      })
      .then(resp => {
        console.log(resp);
        dispatch({ type: 'FETCHED', payload: resp });
      });
  }, [history, url])

  return state;
}

export default useFetch;

// https://github.com/ooade/use-fetch-hook/blob/master/src/hooks.js