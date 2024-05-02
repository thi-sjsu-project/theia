import { useEffect, useState } from 'react';
import type { Position } from 'src/types/support-types';

const initialState: Position = {
  x: 0,
  y: 0,
};

export function useMouseButtonUp() {
  const [mouseButtUp, setMouseButtUp] = useState<string>('-1');

  useEffect(() => {
    function handleMouseButtonUp(ev: MouseEvent) {
      if (ev.button === 0 || ev.button === 1 || ev.button === 2) {
        setMouseButtUp(ev.button.toString());
        console.log('Mouse button pressed: ' + ev.button);
      }
    }

    document.addEventListener('mouseup', handleMouseButtonUp);

    // Don't forget to clean up
    return () => {
      document.removeEventListener('mouseup', handleMouseButtonUp);
    };
  }, []);

  return mouseButtUp;
}
