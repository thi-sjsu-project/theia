/**
 * For April 12, 2024 Friday meeting
 *
 * TODOs:
 * Create grid
 * Moving ownship and drones
 * Integrate sockets
 * ...
 */
import { addWidget, initializeMap } from 'src/redux/slices/cmSlice';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import type { Widget, Element } from 'src/types/modalities';
import { useEffect } from 'react';
import Layout from 'src/components/Layout';

const Prototype2 = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeMap());
  }, []);

  const topHalf: Element = {
    id: 'topHalf',
    modality: 'visual',
    type: 'text',
    locationWidget: [
      [10, 0],
      [40, 24],
    ],
  };
  const bottomHalf: Element = {
    id: 'bottomHalf',
    modality: 'visual',
    type: 'text',
    locationWidget: [
      [10, 25],
      [40, 50],
    ],
  };
  const widget: Widget = {
    id: 'tinder',
    elements: [topHalf, bottomHalf],
    type: 'tinder',
    maxAmount: 1,
    size: [50, 50],
    locationGrid: [
      [100, 200],
      [150, 250],
    ],
    useElementLocation: false,
    canOverlap: false,
  };

  return <Layout />;
};

export default Prototype2;
