import type { SortMethod, SortTypes } from 'src/types/sortMethod';

export const ONE_SECOND_IN_MS = 1000;

export const SCREEN_SIZE = {
  width: 1920,
  height: 1080,
};

export const SHIP_BOUNDS = {
  left: 150,
  right: 1750,
  top: 250,
  bottom: 950,
};

export const OWNSHIP_TRAJECTORY = {
  start: [400, 950],
  end: [1800, 50],
  xSpeed: 1.4,
  ySpeed: 0.8,
};

export const GAZE_RADIUS = 50;
export const CIRCLE_PERCENTAGE_THRESH = 0.1;
export const ELEMENT_PERCENTAGE_THRESH = 0.1;

export const DEFAULT_SORT : SortTypes = 'gaia';
export const sortFunctions: { name: SortTypes; func: SortMethod }[] = [
  {
    name: 'gaia',
    func: (a, b) => 1,
  },
  {
    name: 'priority',
    func: (a, b) => a?.priority! - b?.priority!,
  },
  {
    name: 'time',
    func: (_a, _b) => -1,
  },
];
