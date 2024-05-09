import { v4 as uuid } from 'uuid';
import type { Element, IconElement } from 'src/types/element';
import OWNSHIP_LOGO from 'src/assets/icons/ownship.svg';
import DRONE_LOGO from 'src/assets/icons/drone.svg';
import type { VehicleWidget, WidgetMap } from 'src/types/widget';

const ownshipUuid = uuid();

const createDroneElement = (widgetId: string): IconElement => ({
  type: 'icon',
  modality: 'visual',
  id: uuid(),
  src: DRONE_LOGO,
  tag: 'ownship',

  widgetId,

  h: 50,
  w: 50,

  xWidget: 0,
  yWidget: 0,
});

const createDroneWidget = (
  x: number,
  y: number,
  w: number,
  h: number,
  vehicleId: number,
): VehicleWidget => {
  const id = uuid();
  return {
    elements: [createDroneElement(id)],
    id,
    sectionType: 'free',
    type: 'vehicle',
    screen: '/minimap',
    vehicleId,

    x,
    y,
    w,
    h,

    speed: Math.random() * 0.5 + 0.25,
    rotation: Math.random() * Math.PI,

    canOverlap: false,
    useElementLocation: false,
    maxAmount: 10,
  };
};

const ownshipElement: IconElement = {
  type: 'icon',
  modality: 'visual',
  id: uuid(),
  src: OWNSHIP_LOGO,
  tag: 'ownship',

  widgetId: ownshipUuid,

  h: 56,
  w: 56,

  xWidget: 0,
  yWidget: 0,
};

export const ownship: VehicleWidget = {
  id: ownshipUuid,
  vehicleId: 0,

  x: 400,
  y: 950,
  w: 56,
  h: 56,

  speed: 1.5,
  rotation: 0.2 * Math.PI, // 36deg

  screen: '/minimap',
  sectionType: 'free',
  type: 'vehicle',
  elements: [ownshipElement],

  canOverlap: false,
  useElementLocation: false,
  maxAmount: 10,
};

const drone1 = createDroneWidget(500, 300, 80, 80, 1);
const drone2 = createDroneWidget(1500, 550, 80, 80, 2);
const drone3 = createDroneWidget(1500, 350, 80, 80, 3);
const drone4 = createDroneWidget(200, 900, 80, 80, 4);
const drone5 = createDroneWidget(1150, 750, 80, 80, 5);
const drone6 = createDroneWidget(750, 400, 80, 80, 6);

export const drones = [drone1, drone2, drone3, drone4, drone5, drone6];

export const initialShips: WidgetMap = {
  [ownship.id]: ownship,
  [drone1.id]: drone1,
  [drone2.id]: drone2,
  [drone3.id]: drone3,
  [drone4.id]: drone4,
  [drone5.id]: drone5,
  [drone6.id]: drone6,
};
