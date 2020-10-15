import React from 'react';

import useQuery from '../../hooks/useQuery';

const Query = ({ url, transformData, children }) => {
  const { data, loading } = useQuery({ url, transformData });

  if (loading) {
    return <div>LOADING...</div>
  }

  return children({ data });
}

export default Query;