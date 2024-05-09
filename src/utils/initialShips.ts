import { v4 as uuid } from 'uuid';
import type { IconElement } from 'src/types/element';
import OWNSHIP_LOGO from 'src/icons/currentPosition.svg';
import DRONE_LOGO from 'src/icons/drone.svg';
import type { VehicleWidget, WidgetMap } from 'src/types/widget';

const createDroneWidget = (
  x: number,
  y: number,
  w: number,
  h: number,
  vehicleId: number,
): VehicleWidget => ({
  elements: [droneElement],
  id: uuid(),
  sectionType: 'free',
  type: 'vehicle',
  screen: '/minimap',
  vehicleId,

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

export const ownship: VehicleWidget = {
  id: uuid(),
  vehicleId: 0,

  x: 400,
  y: 950,
  w: 50,
  h: 50,

  screen: '/minimap',
  sectionType: 'free',
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

const drone1 = createDroneWidget(500, 200, 50, 50, 1);
const drone2 = createDroneWidget(1500, 550, 50, 50, 2);
const drone3 = createDroneWidget(1500, 350, 50, 50, 3);
const drone4 = createDroneWidget(200, 900, 50, 50, 4);
const drone5 = createDroneWidget(1150, 750, 50, 50, 5);

export const drones = [drone1, drone2, drone3, drone4, drone5];

export const initialShips: WidgetMap = {
  [ownship.id]: ownship,
  [drone1.id]: drone1,
  [drone2.id]: drone2,
  [drone3.id]: drone3,
  [drone4.id]: drone4,
  [drone5.id]: drone5,
};
