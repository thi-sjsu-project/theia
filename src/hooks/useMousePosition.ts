import { useEffect, useState } from 'react';
import type { Position } from 'src/types/support-types';

const initialState: Position = {
  x: 0,
  y: 0,
};

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState<Position>({
    ...initialState,
  });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({
        x: ev.clientX,
        y: ev.clientY,
      });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return mousePosition;
}
