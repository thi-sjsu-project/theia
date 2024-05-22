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
  const [mouseButtDown, setMouseButtDown] = useState<string>('-1');

  useEffect(() => {
    function handleMouseButtonDown(ev: MouseEvent) {
      //console.log('Mouse button pressed: ' + ev.button);
      ev.preventDefault();
      if (ev.button === 0 || ev.button === 1 || ev.button === 2  || ev.button === 3 ) {
        setMouseButtDown(ev.button.toString());
        //console.log('Mouse button pressed: ' + ev.button);
      }
    }

    document.addEventListener('mousedown', handleMouseButtonDown);

    // Don't forget to clean up
    return () => {
      document.removeEventListener('mousedown', handleMouseButtonDown);
    };
  }, []);

  return mouseButtDown;
}
