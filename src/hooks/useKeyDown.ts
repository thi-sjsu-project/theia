import { useEffect, useState } from 'react';
import type { Position } from 'src/types/support-types';

const initialState: Position = {
  x: 0,
  y: 0,
};

export function useKeyDown() {
  const [keyDown, setKeyDown] = useState<String>('');

  useEffect(() => {
    function handleKeyDown(ev: KeyboardEvent) {
      setKeyDown(ev.code);
      //console.log('Key pressed: ' + ev.code);
    }

    document.addEventListener('keydown', handleKeyDown);

    // Don't forget to clean up
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return keyDown;
}
