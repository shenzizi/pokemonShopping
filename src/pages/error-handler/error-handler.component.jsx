import React, {
  useState,
  useEffect,
  useMemo,
  useContext
} from 'react';
import { useHistory } from 'react-router-dom';

import Page404 from '../404/404.component';

const ErrorStatusContext = React.createContext();

const ErrorHandler = ({ children }) => {
  const history = useHistory();
  const [errorStatusCode, setErrorStatusCode] = useState();

  useEffect(() => {
    const unlisten = history.listen(() => setErrorStatusCode(undefined));

    return unlisten;
  }, [history])

  const renderContent = () => {
    if (errorStatusCode === 404) {
      return <Page404 />
    }
    return children;
  }

  const contextPayload = useMemo(
    () => ({ setErrorStatusCode }),
    [setErrorStatusCode]
  )

  return (
    <ErrorStatusContext.Provider value={({ setErrorStatusCode })}>
      {renderContent()}
    </ErrorStatusContext.Provider>
  )
}

export const useErrorStatus = () => useContext(ErrorStatusContext)

export default ErrorHandler;