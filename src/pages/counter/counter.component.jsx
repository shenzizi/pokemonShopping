import React from 'react';
import useWhyDidYouUpdate from '../../hooks/useWhyDidYouUpdate';


const Counter = React.memo(props => {
  useWhyDidYouUpdate('Counter', props);
  return <div style={props.style}>{props.count}</div>;
});

export default Counter;