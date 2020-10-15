import { useState, useEffect } from 'react';

const useAllQueries = ({ urls }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [apiData, setApiData] = useState();
  const [statusCode, setStatusCode] = useState();

  useEffect(() => {
    if (!urls) {
      return;
    }

    let requests = urls.map(url => fetch(url));
    Promise.all(requests)
      .then(resp => {
        return Promise.all(resp.map(d => d.json()))
      })
      .then(data => {
        setApiData(data);
        setLoading(false);
      })
      .catch(error => {
        setError('error');
        setLoading(false);
      })

  }, [urls])

  return { data: apiData, error, loading }
}

export default useAllQueries;