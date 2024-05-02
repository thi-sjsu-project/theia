import { v4 as uuid } from 'uuid';
import type { IconElement } from 'src/types/element';
import OWNSHIP_LOGO from 'src/icons/currentPosition.svg';
import DRONE_LOGO from 'src/icons/drone.svg';
import type { Widget, WidgetMap } from 'src/types/widget';

const createDroneWidget = (
  x: number,
  y: number,
  w: number,
  h: number,
): Widget => ({
  elements: [droneElement],
  id: uuid(),
  type: 'vehicle',

  x,
  y,
  w,
  h,

  canOverlap: false,
  useElementLocation: false,
  maxAmount: 10,
});

const ownshipElement: IconElement = {
  type: 'icon',
  modality: 'visual',
  id: uuid(),
  src: OWNSHIP_LOGO,
  tag: 'ownship',

  h: 50,
  w: 50,

  xWidget: 0,
  yWidget: 0,
};

export const ownship: Widget = {
  id: uuid(),

  x: 400,
  y: 950,
  w: 50,
  h: 50,

  type: 'vehicle',
  elements: [ownshipElement],

  canOverlap: false,
  useElementLocation: false,
  maxAmount: 10,
};

const droneElement: IconElement = {
  id: uuid(),
  modality: 'visual',
  type: 'icon',
  src: DRONE_LOGO,
  tag: 'drone',

  h: 50,
  w: 50,

  xWidget: 0,
  yWidget: 0,
};

export const drones = [
  createDroneWidget(500, 200, 50, 50),
  createDroneWidget(1500, 550, 50, 50),
  createDroneWidget(1500, 350, 50, 50),
  createDroneWidget(200, 900, 50, 50),
  createDroneWidget(1150, 750, 50, 50),
];

export const initialShips: WidgetMap = {
  [ownship.id]: ownship,
  ...drones.reduce((acc, drone) => {
    acc[drone.id] = drone;
    return acc;
  }, {} as WidgetMap),
};
