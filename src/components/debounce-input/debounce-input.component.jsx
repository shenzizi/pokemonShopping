import React, {
  useState,
  useCallback
} from 'react';

const DebounceInput = ({ callback, delay }) => {
  const [value, setValue] = useState('');
  const [timer, setTimer] = useState(null);


  const handleChange = useCallback(e => {
    const inputValue = e.target.value;
    setValue(inputValue);
    if (timer) {
      clearTimeout(timer);
    }
    const timerId = setTimeout(() => callback(inputValue), delay)
    setTimer(timerId);

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }
    , [callback, delay, timer]
  )

  return (
    <div>
      debounce input
      <input
        value={value}
        onChange={handleChange} />
    </div>
  )
}

export default DebounceInput;