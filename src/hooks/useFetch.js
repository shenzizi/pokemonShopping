import {
  useReducer,
  useEffect
} from 'react';

const useFetch = (url) => {
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
      .then(resp => resp.json())
      .then(resp => {
        dispatch({ type: 'FETCHED', payload: resp });
      });
  }, [url])

  return state;
}

export default useFetch;