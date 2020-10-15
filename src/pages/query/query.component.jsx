import React from 'react';
// import Page404 from '../404/404.component';

import useQuery from '../../hooks/useQuery';

const Query = ({ url, transformData, children }) => {
  const { data, loading } = useQuery({ url, transformData });

  console.log('Query', data);

  if (loading) {
    return <div>LOADING...</div>
  }

  // if (error) {
  //   return <Page404 />
  // }

  return children({ data });
}

export default Query;