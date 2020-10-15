import React, { useState } from 'react';

import usePrevious from '../../hooks/usePrevious';

const Counter = () => {
  const [count, setCount] = useState(0);
  const prevCounter = usePrevious(count);

  return (
    <div>
      <p>now: {count} before {prevCounter}</p>
      <button onClick={() => setCount(count + 1)}>increment</button>
    </div>
  )
}

export default Counter;
