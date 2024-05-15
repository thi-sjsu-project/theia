import { useEffect } from 'react';
import Widget from 'src/components/Widget/Widget';
import useGaze from 'src/hooks/useGaze';
import { useAppSelector } from 'src/redux/hooks';
import { getElementsInGaze } from 'src/redux/slices/gazeSlice';
import { getWidgetsOnScreen } from 'src/redux/slices/minimapSlice';
import LeftScreenMap from 'src/assets/left-bottom-map.png';
import LeftScreenVideo from 'src/assets/left-video.png';

const LeftScreen = () => {
  const widgets = useAppSelector((state) =>
    getWidgetsOnScreen(state, '/pearce-screen'),
  );

  useGaze({ screen: '/pearce-screen' });

  const elementsInGaze = useAppSelector(getElementsInGaze);

  useEffect(() => {
    console.log('elementsInGaze: ', elementsInGaze);
  }, [elementsInGaze]);

  return (
    <div className="absolute top-0 left-0 bg-[#1E1E1E] w-[1920px] h-[1080px] hover:cursor-pointer">
      {/* Top Bar */}
      <div className="absolute min-w-[1920px] border-2 border-b-stone-800 min-h-[100px]" />

      {/* Left Video & Map Box */}
      <div
        className="absolute top-[150px] left-[50px] flex items-center justify-center flex-col gap-10"
        style={{
          height: '900px',
          width: '600px',
        }}
      >
        <div className="border-2 border-stone-800 min-w-[450px] min-h-[200px] flex items-center justify-center">
          <img
            style={{ width: 500 }}
            src={LeftScreenVideo}
            alt="Left Bottom Map"
          />
        </div>
        <div className="border-2 border-stone-800 min-w-[450px] min-h-[200px] flex items-center justify-center gap-10">
          <img
            style={{ width: 500 }}
            src={LeftScreenMap}
            alt="Left Bottom Map"
          />
        </div>
      </div>

      {/* Center box */}
      <div className="min-w-[600px] min-h-[800px] absolute left-[750px] top-[150px] border-2 border-stone-800 flex items-center justify-center">
        <span className="text-3xl">Additional Details</span>
      </div>

      {/* Maybe just render a WidgetList component? Or a ListWidget component? */}
      {Object.keys(widgets).map((widgetId) => (
        <Widget key={widgetId} widget={widgets[widgetId]} />
      ))}
    </div>
  );
};

export default LeftScreen;
