import Widget from 'src/components/Widget/Widget';
import { useAppSelector } from 'src/redux/hooks';
import { getWidgetsOnScreen } from 'src/redux/slices/minimapSlice';
import useMoveShips from 'src/hooks/useMoveShips';
import useGaze from 'src/hooks/useGaze';
import { getElementsInGaze } from 'src/redux/slices/gazeSlice';
import { useEffect } from 'react';

const Minimap = () => {
  const widgets = useAppSelector((state) =>
    getWidgetsOnScreen(state, '/minimap'),
  );
  /* If this is here, then ships only move if this page is being rendered */
  useMoveShips();

  useGaze({ screen: '/minimap' });

  const elementsInGaze = useAppSelector(getElementsInGaze);

  useEffect(() => {
    console.log('elementsInGaze: ', elementsInGaze);
  }, [elementsInGaze]);

  return (
    <div className="absolute top-0 left-0 bg-stone-200 w-[1920px] h-[1080px] hover:cursor-pointer">
      {Object.keys(widgets).map((widgetId) => (
        <Widget key={widgetId} widget={widgets[widgetId]} />
      ))}
    </div>
  );
};

export default Minimap;
