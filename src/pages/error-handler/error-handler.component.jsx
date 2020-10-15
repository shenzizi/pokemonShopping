import React from 'react';

import Page404 from '../404/404.component';

import { useLocation } from 'react-router-dom';

const ErrorHandler = ({ children }) => {
  const location = useLocation();
  if (location.state) {
    switch (location.state.errorStatusCode) {
      case 404:
        return <Page404 />
      default:
        return <div>error</div>
    }
  }

  return children;

}

export default ErrorHandler;