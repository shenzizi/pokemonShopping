import React, {
  useState, useEffect
} from 'react';

const DebounceInput = ({ callback, delay }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    console.log('useEffect', callback);
    const timer = setTimeout(() => callback(value), delay)
    return () => clearTimeout(timer);
  }, [callback, delay, value])

  const handleChange = e => setValue(e.target.value);

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