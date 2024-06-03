import { useEffect } from 'react';
import {
  setElementsInGaze,
  type ElementInGazeMap,
} from 'src/redux/slices/gazeSlice';
import { GAZE_RADIUS } from 'src/utils/constants';
import { type Screen } from 'src/types/support-types';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { getElementsOnScreen } from 'src/redux/slices/cmSlice';

type GazeProps = {
  screen: Screen;
};

const useGaze = ({ screen }: GazeProps) => {
  const dispatch = useAppDispatch();

  // get all elements on the screen
  const elementsOnScreen = useAppSelector((state) =>
    getElementsOnScreen(state, screen),
  );

  useEffect(() => {
    const handleMouseMove = (ev: MouseEvent) => {
      const mouseX = ev.clientX;
      const mouseY = ev.clientY;

      // grab all divs on the screen
      const divs = document.querySelectorAll('div');

      const elementsInGaze: ElementInGazeMap = {};

      Array.from(divs).forEach((div) => {
        // get the bounding box of the div
        const rect = div.getBoundingClientRect();
        const divLeft = rect.left;
        const divRight = rect.right;
        const divTop = rect.top;
        const divBottom = rect.bottom;

        const divId = div.id;

        // find the closest point in the div to the mouse
        const closestX =
          mouseX < divLeft ? divLeft : mouseX > divRight ? divRight : mouseX;
        const closestY =
          mouseY < divTop ? divTop : mouseY > divBottom ? divBottom : mouseY;

        // check if the closest point is within the gaze radius
        const distance = Math.sqrt(
          (closestX - mouseX) ** 2 + (closestY - mouseY) ** 2,
        );

        // if div within gaze radius and is an element on screen, add to elementsInGaze
        if (distance < GAZE_RADIUS && elementsOnScreen[divId]) {
          elementsInGaze[divId] = {
            id: divId,
            // assumes widgetId is not null
            widgetId: elementsOnScreen[divId].widgetId!,
            timeEnteredGaze: new Date().toISOString(),
          };
        }
      });

      // update elements in gaze
      dispatch(setElementsInGaze(Object.values(elementsInGaze)));
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [elementsOnScreen, dispatch]);
};

export default useGaze;
