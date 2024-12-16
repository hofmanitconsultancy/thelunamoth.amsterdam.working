import { useEffect, useState } from 'react';
import { DEBOUNCE_DELAYS } from '../../constants';

export function useDebounce<T>(value: T, delay: number = DEBOUNCE_DELAYS.SEARCH): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}