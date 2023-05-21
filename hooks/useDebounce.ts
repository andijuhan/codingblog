import { useEffect, useState } from 'react';

const useDebounce = (value: string, delay: number) => {
   const [debouncedValue, setDebouncedValue] = useState(value);

   useEffect(() => {
      const debounceTimer = setTimeout(() => {
         setDebouncedValue(value);
      }, delay);

      return () => {
         clearTimeout(debounceTimer);
      };
   }, [value, delay]);

   return debouncedValue;
};

export default useDebounce;
