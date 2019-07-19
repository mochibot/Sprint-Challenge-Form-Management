import { useState } from 'react';

const useLocalStorage = (key) => {
  const [storedValue, setStoredValue] = useState(() => {
    return window.localStorage.getItem(key) ? window.localStorage.getItem(key) : null;
  })
  const setValue = (value) => {
    setStoredValue(value);
    window.localStorage.setItem(key, value);
  }
  return [storedValue, setValue];
}

export default useLocalStorage;