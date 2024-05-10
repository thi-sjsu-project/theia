// temporary until we generate map warnings on the fly

import type { MapWarningWidget, WidgetMap } from 'src/types/widget';
import { v4 as uuid } from 'uuid';

import threatMissileLgEmph from 'src/assets/icons/threats/missile-lg-emph.svg';
import threatArtillerySmReg from 'src/assets/icons/threats/artillery-sm-reg.svg';
import threatAirDefenseSmReg from 'src/assets/icons/threats/airdefense-sm-reg.svg';
import threatRadarSmReg from 'src/assets/icons/threats/radar-sm-reg.svg';

const defaultWidget = {
  screen: '/minimap',
  sectionType: 'free',
  type: 'map-warning',

  canOverlap: false,
  useElementLocation: false,
  maxAmount: 10,
} as const;

const defaultIcon = {
  type: 'icon',
  modality: 'visual',
  xWidget: 0,
  yWidget: 0,
} as const;

const warn1: MapWarningWidget = {
  ...defaultWidget,
  id: uuid(),
  x: 750,
  y: 200,
  w: 128,
  h: 129,
  elements: [
    {
      ...defaultIcon,
      id: uuid(),
      src: threatMissileLgEmph,
      w: 128,
      h: 129,
    },
  ],
};

const warn2: MapWarningWidget = {
  ...defaultWidget,
  id: uuid(),
  x: 900,
  y: 50,
  w: 80,
  h: 81,
  elements: [
    {
      ...defaultIcon,
      id: uuid(),
      src: threatAirDefenseSmReg,
      w: 80,
      h: 81,
    },
  ],
};

const warn3: MapWarningWidget = {
  ...defaultWidget,
  id: uuid(),
  x: 300,
  y: 100,
  w: 80,
  h: 81,
  elements: [
    {
      ...defaultIcon,
      id: uuid(),
      src: threatAirDefenseSmReg,
      w: 80,
      h: 81,
    },
  ],
};

const warn4: MapWarningWidget = {
  ...defaultWidget,
  id: uuid(),
  x: 500,
  y: 200,
  w: 80,
  h: 81,
  elements: [
    {
      ...defaultIcon,
      id: uuid(),
      src: threatRadarSmReg,
      w: 80,
      h: 81,
    },
  ],
};

const warn5: MapWarningWidget = {
  ...defaultWidget,
  id: uuid(),
  x: 950,
  y: 400,
  w: 80,
  h: 81,
  elements: [
    {
      ...defaultIcon,
      id: uuid(),
      src: threatArtillerySmReg,
      w: 80,
      h: 81,
    },
  ],
};

const warn6: MapWarningWidget = {
  ...defaultWidget,
  id: uuid(),
  x: 850,
  y: 700,
  w: 80,
  h: 81,
  elements: [
    {
      ...defaultIcon,
      id: uuid(),
      src: threatRadarSmReg,
      w: 80,
      h: 81,
    },
  ],
};

const warn7: MapWarningWidget = {
  ...defaultWidget,
  id: uuid(),
  x: 1300,
  y: 100,
  w: 80,
  h: 81,
  elements: [
    {
      ...defaultIcon,
      id: uuid(),
      src: threatRadarSmReg,
      w: 80,
      h: 81,
    },
  ],
};

const warn8: MapWarningWidget = {
  ...defaultWidget,
  id: uuid(),
  x: 1600,
  y: 350,
  w: 80,
  h: 81,
  elements: [
    {
      ...defaultIcon,
      id: uuid(),
      src: threatAirDefenseSmReg,
      w: 80,
      h: 81,
    },
  ],
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
