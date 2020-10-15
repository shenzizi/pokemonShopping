import {
  useState,
  useEffect,
  useRef
} from 'react';

import { useHistory } from 'react-router-dom';

const useQuery = ({ url, transformData }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [apiData, setApiData] = useState();
  const mountedRef = useRef();

  useEffect(() => {
    mountedRef.current = true;
    if (!url) {
      return;
    }

    fetch(url)
      .then(resp => {
        if (resp.status > 400) {
          history.replace(history.location.pathname, {
            errorStatusCode: resp.status
          })
        }

        return resp.json()
      })
      .then(data => {
        setApiData(transformData ? transformData(data) : data);
        setLoading(false);
      })
      .catch(error => {
        console.log('error', error);
        if (mountedRef.current) {
          setError(`error`);
          setLoading(false);
        }
      })

    return () => {
      // Called before unmount by React
      mountedRef.current = false;
    };

  }, [history, transformData, url])

  return { data: apiData, loading }
}

export default useQuery;