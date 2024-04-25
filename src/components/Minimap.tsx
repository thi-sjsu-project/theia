import type { Widget as WidgetType } from 'src/types/widget';
import Widget from 'src/components/Widget/Widget';
import useMoveShips from 'src/hooks/useMoveShips';

type MinimapProps = {
  widgets: WidgetType[];
};

const Minimap = ({ widgets }: MinimapProps) => {
  useMoveShips();

  return (
    <div className="absolute top-0 left-0 bg-stone-300 w-[1920px] h-[1080px] hover:cursor-pointer">
      {widgets.map((widget) => (
        <Widget key={widget.id} widget={widget} />
      ))}
    </div>
  );
};

export default Minimap;
