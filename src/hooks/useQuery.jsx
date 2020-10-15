import {
  useState,
  useEffect,
  useRef
} from 'react';

import { useErrorStatus } from '../pages/error-handler/error-handler.component';

const useQuery = ({ url, transformData }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [apiData, setApiData] = useState();
  const { setErrorStatusCode } = useErrorStatus();
  const mountedRef = useRef();

  useEffect(() => {
    mountedRef.current = true;
    if (!url) {
      return;
    }

    fetch(url)
      .then(resp => {
        if (resp.status > 400) {
          setErrorStatusCode(resp.status);
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

  }, [setErrorStatusCode, transformData, url])

  return { data: apiData, error, loading }
}

export default useQuery;