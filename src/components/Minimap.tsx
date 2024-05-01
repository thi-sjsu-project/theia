import type { WidgetMap } from 'src/types/widget';
import Widget from 'src/components/Widget/Widget';
import useMoveShips from 'src/hooks/useMoveShips';

type MinimapProps = {
  widgets: WidgetMap;
};

const Minimap = ({ widgets }: MinimapProps) => {
  useMoveShips();

  return (
    <div className="absolute top-0 left-0 bg-stone-200 w-[1920px] h-[1080px] hover:cursor-pointer">
      {Object.keys(widgets).map((widgetId) => (
        <Widget key={widgetId} widget={widgets[widgetId]} />
      ))}
    </div>
  );
};

export default Minimap;
