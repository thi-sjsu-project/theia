import { v4 as uuid } from 'uuid';
import OWNSHIP_LOGO from 'src/assets/icons/ownship.svg';
import DRONE_LOGO from 'src/assets/icons/drone.svg';
import type { MapWarningWidget, Widget, WidgetMap } from 'src/types/widget';
import lpdHelper from 'src/utils/lpdHelper';
// temporary until we generate map warnings on the fly

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

const initailMapWarnings: WidgetMap = {
  [warn1.id]: warn1,
  //[warn2.id]: warn2,
  //[warn3.id]: warn3,
  [warn4.id]: warn4,
  [warn5.id]: warn5,
  [warn6.id]: warn6,
  //[warn7.id]: warn7,
  [warn8.id]: warn8,
};

export const ownship: Widget = {
  ...lpdHelper.generateVehicleWidget(
    lpdHelper.generateBaseWidget(
      uuid(),
      'vehicle',
      400,
      950,
      50,
      50,
      '/minimap',
      false,
      false,
      1,
      [
        lpdHelper.generateIconElement(
          lpdHelper.generateBaseElement(uuid(), 'visual', 50, 50, 0, 0),
          OWNSHIP_LOGO,
          'ownship',
        ),
      ],
    ),
    0,
    1.5,
    0.2 * Math.PI, // 36deg
  ),
};

export const drones: Widget[] = [
  {
    ...lpdHelper.generateVehicleWidget(
      lpdHelper.generateBaseWidget(
        uuid(),
        'vehicle',
        500,
        200,
        80,
        80,
        '/minimap',
        false,
        false,
        10,
        [
          lpdHelper.generateIconElement(
            lpdHelper.generateBaseElement(uuid(), 'visual', 50, 50, 0, 0),
            DRONE_LOGO,
            'drone',
          ),
        ],
      ),
      1,
      Math.random() * 0.5 + 0.25,
      Math.random() * Math.PI,
    ),
  },
  {
    ...lpdHelper.generateVehicleWidget(
      lpdHelper.generateBaseWidget(
        uuid(),
        'vehicle',
        1500,
        550,
        80,
        80,
        '/minimap',
        false,
        false,
        10,
        [
          lpdHelper.generateIconElement(
            lpdHelper.generateBaseElement(uuid(), 'visual', 50, 50, 0, 0),
            DRONE_LOGO,
            'drone',
          ),
        ],
      ),
      2,
      Math.random() * 0.5 + 0.25,
      Math.random() * Math.PI,
    ),
  },
  {
    ...lpdHelper.generateVehicleWidget(
      lpdHelper.generateBaseWidget(
        uuid(),
        'vehicle',
        1500,
        350,
        80,
        80,
        '/minimap',
        false,
        false,
        10,
        [
          lpdHelper.generateIconElement(
            lpdHelper.generateBaseElement(uuid(), 'visual', 50, 50, 0, 0),
            DRONE_LOGO,
            'drone',
          ),
        ],
      ),
      3,
      Math.random() * 0.5 + 0.25,
      Math.random() * Math.PI,
    ),
  },
  {
    ...lpdHelper.generateVehicleWidget(
      lpdHelper.generateBaseWidget(
        uuid(),
        'vehicle',
        200,
        900,
        80,
        80,
        '/minimap',
        false,
        false,
        10,
        [
          lpdHelper.generateIconElement(
            lpdHelper.generateBaseElement(uuid(), 'visual', 50, 50, 0, 0),
            DRONE_LOGO,
            'drone',
          ),
        ],
      ),
      4,
      Math.random() * 0.5 + 0.25,
      Math.random() * Math.PI,
    ),
  },
  {
    ...lpdHelper.generateVehicleWidget(
      lpdHelper.generateBaseWidget(
        uuid(),
        'vehicle',
        1150,
        750,
        80,
        80,
        '/minimap',
        false,
        false,
        10,
        [
          lpdHelper.generateIconElement(
            lpdHelper.generateBaseElement(uuid(), 'visual', 50, 50, 0, 0),
            DRONE_LOGO,
            'drone',
          ),
        ],
      ),
      5,
      Math.random() * 0.5 + 0.25,
      Math.random() * Math.PI,
    ),
  },
];

const initialShips: WidgetMap = {
  [ownship.id]: ownship,
  [drones[0].id]: drones[0],
  [drones[1].id]: drones[1],
  [drones[2].id]: drones[2],
  [drones[3].id]: drones[3],
  [drones[4].id]: drones[4],
};

const initialLPD = {
  sections: [
    lpdHelper.generateSection(
      uuid(),
      '/minimap',
      50,
      40,
      350,
      900,
      10,
      'tinder',
      [],
    ),
    lpdHelper.generateSection(
      uuid(),
      '/minimap',
      50,
      850,
      800,
      200,
      10,
      'request',
      [],
    ),
    lpdHelper.generateSection(
      uuid(),
      '/minimap',
      800,
      200,
      500,
      250,
      10,
      'highWarning',
      [],
    ),
    lpdHelper.generateSection(
      uuid(),
      '/minimap',
      1800,
      450,
      500,
      200,
      10,
      'lowWarning',
      [],
    ),
    lpdHelper.generateSection(
      uuid(),
      '/minimap',
      1800,
      200,
      200,
      200,
      10,
      'message',
      [],
    ),
  ],
  widgets: {...initialShips, ...initailMapWarnings}
};

export default initialLPD;