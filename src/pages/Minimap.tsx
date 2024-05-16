import Widget from 'src/components/Widget/Widget';
import { useAppSelector } from 'src/redux/hooks';
import { getWidgetsOnScreen } from 'src/redux/slices/minimapSlice';
import useMoveShips from 'src/hooks/useMoveShips';
import useGaze from 'src/hooks/useGaze';
import { getElementsInGaze } from 'src/redux/slices/gazeSlice';
import { useEffect } from 'react';
import background from 'src/assets/minimap-bg.jpg';
import ACA from 'src/components/Widget/ACA';
import ACAHeader from 'src/components/Element/ACAHeader';

const data: {
  title: string;
  ammoLeft: ('Used' | 'Unused')[];
  ammoRight: ('Used' | 'Unused')[];
  fuelAmount: number;
  circleColor: 'blue' | 'yellow';
}[] = [
  {
    title: 'ACA-1',
    ammoLeft: ['Unused', 'Unused', 'Unused', 'Used'],
    ammoRight: ['Unused', 'Used', 'Used', 'Used'],
    fuelAmount: 70,
    circleColor: 'blue',
  },
  {
    title: 'ACA-2',
    ammoLeft: ['Unused', 'Used', 'Used', 'Used'],
    ammoRight: ['Unused', 'Unused', 'Used', 'Used'],
    fuelAmount: 15,
    circleColor: 'yellow',
  },
  {
    title: 'ACA-3',
    ammoLeft: ['Unused', 'Unused', 'Used', 'Used'],
    ammoRight: ['Unused', 'Used', 'Used', 'Used'],
    fuelAmount: 40,
    circleColor: 'blue',
  },
  {
    title: 'ACA-4',
    ammoLeft: ['Unused', 'Used', 'Used', 'Used'],
    ammoRight: ['Unused', 'Unused', 'Used', 'Used'],
    fuelAmount: 90,
    circleColor: 'yellow',
  },
  {
    title: 'ACA-5',
    ammoLeft: ['Unused', 'Unused', 'Used', 'Used'],
    ammoRight: ['Unused', 'Used', 'Used', 'Used'],
    fuelAmount: 20,
    circleColor: 'blue',
  },
  {
    title: 'ACA-6',
    ammoLeft: ['Unused', 'Used', 'Used', 'Used'],
    ammoRight: ['Unused', 'Unused', 'Used', 'Used'],
    fuelAmount: 10,
    circleColor: 'yellow',
  },
];

const Minimap = () => {
  const widgets = useAppSelector((state) =>
    getWidgetsOnScreen(state, '/minimap'),
  );
  /* If this is here, then ships only move if this page is being rendered */
  useMoveShips();

  useGaze({ screen: '/minimap' });

  const elementsInGaze = useAppSelector(getElementsInGaze);

  // useEffect(() => {
  //   console.log('elementsInGaze: ', elementsInGaze);
  // }, [elementsInGaze]);

  return (
    <>
      {/* ACAHeader should be part of the widgets array below. */}
      <ACAHeader data={data} />
      <div
        className="bg-stone-200 w-[1920px] h-[950px]"
        style={{ backgroundImage: `url(${background})` }}
      >
        {Object.keys(widgets).map((widgetId) => (
          <Widget key={widgetId} widget={widgets[widgetId]} />
        ))}
      </div>
    </>
  );
};

export default Minimap;
