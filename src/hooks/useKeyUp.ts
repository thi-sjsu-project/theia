import { useEffect, useState } from 'react';

export type Position = {
  x: number;
  y: number;
};

const initialState: Position = {
  x: 0,
  y: 0,
};

export function useKeyUp() {
  const [keyUp, setKeyUp] = useState<String>('');

  useEffect(() => {
    function handleKeyUp(ev: KeyboardEvent) {
      setKeyUp(ev.code);
      console.log('Key pressed: ' + ev.code);
    }

    document.addEventListener('keyup', handleKeyUp);

    // Don't forget to clean up
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return keyUp;
}
