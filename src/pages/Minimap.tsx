import Widget from 'src/components/Widget/Widget';
import { useAppSelector } from 'src/redux/hooks';
import { getWidgets } from 'src/redux/slices/minimapSlice';

const Minimap = () => {
  const widgets = useAppSelector(getWidgets);

  return (
    <div className="absolute top-0 left-0 bg-stone-200 w-[1920px] h-[1080px] hover:cursor-pointer">
      {Object.keys(widgets).map((widgetId) => (
        <Widget key={widgetId} widget={widgets[widgetId]} />
      ))}
    </div>
  );
};

export default Minimap;
