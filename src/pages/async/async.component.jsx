import React, {
  useState,
  useMemo,
  useCallback
} from 'react';

import Counter from '../counter/counter.component';
import DebounceInput from '../../components/debounce-input/debounce-input-my.component';
import MemoCounter from '../../components/counter/counter.component';

import useAsync from '../../hooks/useAsync';


// const counterStyle = {
//   fontSize: '3rem',
//   color: 'red'
// };

const Async = () => {
  const [count, setCount] = useState(0);
  const [userId, setUserId] = useState(0);
  // const [style, setStyle] = useState({
  //   fontSize: '3rem',
  //   color: 'red'
  // });

  const myFunction = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const rnd = Math.random() * 10;
        rnd <= 5 ? resolve('submitted successfully!')
          : reject('oh no there was an error');
      }, 2000)
    })
  }

  // const counterStyle = useMemo(() => ({
  //   fontSize: '3rem',
  //   color: 'red'
  // }), []);

  const counterStyle = {
    fontSize: '3rem',
    color: 'red'
  };

  const { execute, status, value, error } = useAsync(myFunction, false);

  const debounceInputCallback = useCallback((value) => {
    console.log('callback', value);
  })

  return (
    <div>

      <div className="counter">
        <Counter count={count} style={counterStyle} />
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
      <div className="user">
        {userId}
        <button onClick={() => setUserId(userId + 1)}>Switch User</button>
      </div>

      async
      {status === 'idle' && <div>start your journey by clicking a button</div>}
      {status === 'success' && <div>{value}</div>}
      {status === 'error' && <div>{error}</div>}
      <button
        onClick={execute}
        disable={status === 'pending'}
      >
        {status !== 'pending' ? 'click me' : 'loading'}
      </button>
      <DebounceInput callback={debounceInputCallback} delay={2000} />
      <hr />
      <MemoCounter />
    </div>
  )
}

export default Async;