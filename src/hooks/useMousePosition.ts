import { useEffect, useState } from 'react';

type MousePosition = {
  x: number | undefined;
  y: number | undefined;
};

const initialState: MousePosition = {
  x: undefined,
  y: undefined,
};

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
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
