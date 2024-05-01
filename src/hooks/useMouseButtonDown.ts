import { useEffect, useState } from 'react';

export type Position = {
  x: number;
  y: number;
};

const initialState: Position = {
  x: 0,
  y: 0,
};

export function useMouseButtonDown() {
  const [mouseButtDown, setMouseButtDown] = useState<Number>(-1);

  useEffect(() => {
    function handleMouseButtonDown(ev: MouseEvent) {
      if (ev.button === 0 || ev.button === 1 || ev.button === 2) {
        setMouseButtDown(ev.button);
        console.log('Mouse button pressed: ' + ev.button);
      }
    }

    document.addEventListener('mouseup', handleMouseButtonDown);

    // Don't forget to clean up
    return () => {
      document.removeEventListener('mouseup', handleMouseButtonDown);
    };
  }, []);

  return mouseButtDown;
}
