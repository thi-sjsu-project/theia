// temporary until we generate map warnings on the fly

import type { MapWarningWidget, WidgetMap } from 'src/types/widget';
import { v4 as uuid } from 'uuid';

const defaults = {
  w: 1, // w and h are ignored currently since `small` is used to determine which size the widget should have
  h: 1,

  screen: '/minimap',
  sectionType: 'free',
  type: 'map-warning',

  canOverlap: false,
  useElementLocation: false,
  maxAmount: 10,
} as const;

const warn1: MapWarningWidget = {
  ...defaults,
  elements: [],

  id: uuid(),

  x: 750,
  y: 200,

  emphasised: true,
  small: false,
  threatType: 'missile',
};

const warn2: MapWarningWidget = {
  ...defaults,
  elements: [],

  id: uuid(),

  x: 900,
  y: 50,

  emphasised: false,
  small: true,
  threatType: 'air-defense',
};

const warn3: MapWarningWidget = {
  ...defaults,
  elements: [],

  id: uuid(),

  x: 300,
  y: 100,

  emphasised: false,
  small: true,
  threatType: 'air-defense',
};

const warn4: MapWarningWidget = {
  ...defaults,
  elements: [],

  id: uuid(),

  x: 500,
  y: 200,

  emphasised: false,
  small: true,
  threatType: 'radar',
};

const warn5: MapWarningWidget = {
  ...defaults,
  elements: [],

  id: uuid(),

  x: 950,
  y: 400,

  emphasised: false,
  small: true,
  threatType: 'artillery',
};

const warn6: MapWarningWidget = {
  ...defaults,
  elements: [],

  id: uuid(),

  x: 850,
  y: 700,

  emphasised: false,
  small: true,
  threatType: 'radar',
};

const warn7: MapWarningWidget = {
  ...defaults,
  elements: [],

  id: uuid(),

  x: 1300,
  y: 100,

  emphasised: false,
  small: true,
  threatType: 'radar',
};

const warn8: MapWarningWidget = {
  ...defaults,
  elements: [],

  id: uuid(),

  x: 1600,
  y: 350,

  emphasised: false,
  small: true,
  threatType: 'air-defense',
};

export const initailMapWarnings: WidgetMap = {
  [warn1.id]: warn1,
  [warn2.id]: warn2,
  [warn3.id]: warn3,
  [warn4.id]: warn4,
  [warn5.id]: warn5,
  [warn6.id]: warn6,
  [warn7.id]: warn7,
  [warn8.id]: warn8,
};
