import Widget from 'src/components/Widget/Widget';
import { useAppSelector } from 'src/redux/hooks';
import { getMinimapWidgets } from 'src/redux/slices/minimapSlice';
import useMoveShips from 'src/hooks/useMoveShips';
import { useEffect } from 'react';

const Minimap = () => {
  const widgets = useAppSelector(getMinimapWidgets);
  /* If this is here, then ships only move if this page is being rendered */
  useMoveShips();

  useEffect(() => {
    console.log('Minimap widgets:', widgets);
  }, [widgets.length]);

  return (
    <div className="absolute top-0 left-0 bg-stone-200 w-[1920px] h-[1080px] hover:cursor-pointer">
      {widgets.map((widget) => (
        <Widget key={widget.id} widget={widget} />
      ))}
    </div>
  );
};

export default Minimap;
