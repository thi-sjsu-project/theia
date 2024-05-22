import { useEffect } from 'react';
import Widget from 'src/components/Widget/Widget';
import useGaze from 'src/hooks/useGaze';
import { useAppSelector } from 'src/redux/hooks';
import { getElementsInGaze } from 'src/redux/slices/gazeSlice';
import { getWidgetsOnScreen } from 'src/redux/slices/minimapSlice';

const LeftScreen = () => {
  const widgets = useAppSelector((state) =>
    getWidgetsOnScreen(state, '/pearce-screen'),
  );

  useGaze({ screen: '/pearce-screen' });

  const elementsInGaze = useAppSelector(getElementsInGaze);

  // useEffect(() => {
  //   console.log('elementsInGaze: ', elementsInGaze);
  // }, [elementsInGaze]);
  
  return (
    <div className="absolute top-0 left-0 bg-[#1E1E1E] w-[1920px] h-[1080px] hover:cursor-pointer">
      {/* Top Bar */}
      <div className="absolute w-[1920px] bg-[#252526] h-[100px] shadow-lg shadow-[#181818]" />

      {/* Maybe just render a WidgetList component? Or a ListWidget component? */}
      {Object.keys(widgets).map((widgetId) => (
        <Widget key={widgetId} widget={widgets[widgetId]} />
      ))}
    </div>
  );
};

export default LeftScreen;
