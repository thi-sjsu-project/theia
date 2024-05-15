import { v4 as uuid } from 'uuid';
import OWNSHIP_LOGO from 'src/assets/icons/ownship.svg';
import DRONE_LOGO from 'src/assets/icons/drone.svg';
import type { MapWarningWidget, Widget, WidgetMap } from 'src/types/widget';
import lpdHelper from 'src/utils/lpdHelper';
import initialSections from 'src/prototype/utils/initialSections';
import initialWidgets from 'src/prototype/utils/initialWidgets';
// temporary until we generate map warnings on the fly

import threatMissileLgEmph from 'src/assets/icons/threats/missile-lg-emph.svg';
import threatArtillerySmReg from 'src/assets/icons/threats/artillery-sm-reg.svg';
import threatAirDefenseSmReg from 'src/assets/icons/threats/airdefense-sm-reg.svg';
import threatRadarSmReg from 'src/assets/icons/threats/radar-sm-reg.svg';

const warnUuid1 = uuid();
const warnUuid2 = uuid();
const warnUuid3 = uuid();
const warnUuid4 = uuid();
const warnUuid5 = uuid();
const warnUuid6 = uuid();
const warnUuid7 = uuid();
const warnUuid8 = uuid();

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
  id: warnUuid1,
  x: 750,
  y: 200,
  w: 128,
  h: 129,
  elements: [
    {
      ...defaultIcon,
      id: uuid(),
      widgetId: warnUuid1, // new gaze implemention needs this (for now)
      src: threatMissileLgEmph,
      w: 128,
      h: 129,
    },
  ],
};

const warn2: MapWarningWidget = {
  ...defaultWidget,
  id: warnUuid2,
  x: 900,
  y: 50,
  w: 80,
  h: 81,
  elements: [
    {
      ...defaultIcon,
      id: uuid(),
      widgetId: warnUuid2, // new gaze implemention needs this (for now)
      src: threatAirDefenseSmReg,
      w: 80,
      h: 81,
    },
  ],
};

const warn3: MapWarningWidget = {
  ...defaultWidget,
  id: warnUuid3,
  x: 300,
  y: 100,
  w: 80,
  h: 81,
  elements: [
    {
      ...defaultIcon,
      id: uuid(),
      widgetId: warnUuid3, // new gaze implemention needs this (for now)
      src: threatAirDefenseSmReg,
      w: 80,
      h: 81,
    },
  ],
};

const warn4: MapWarningWidget = {
  ...defaultWidget,
  id: warnUuid4,
  x: 500,
  y: 200,
  w: 80,
  h: 81,
  elements: [
    {
      ...defaultIcon,
      id: uuid(),
      widgetId: warnUuid4, // new gaze implemention needs this (for now)
      src: threatRadarSmReg,
      w: 80,
      h: 81,
    },
  ],
};

const warn5: MapWarningWidget = {
  ...defaultWidget,
  id: warnUuid5,
  x: 950,
  y: 400,
  w: 80,
  h: 81,
  elements: [
    {
      ...defaultIcon,
      id: uuid(),
      widgetId: warnUuid5, // new gaze implemention needs this (for now)
      src: threatArtillerySmReg,
      w: 80,
      h: 81,
    },
  ],
};

const warn6: MapWarningWidget = {
  ...defaultWidget,
  id: warnUuid6,
  x: 850,
  y: 700,
  w: 80,
  h: 81,
  elements: [
    {
      ...defaultIcon,
      id: uuid(),
      widgetId: warnUuid6, // new gaze implemention needs this (for now)
      src: threatRadarSmReg,
      w: 80,
      h: 81,
    },
  ],
};

const warn7: MapWarningWidget = {
  ...defaultWidget,
  id: warnUuid7,
  x: 1300,
  y: 100,
  w: 80,
  h: 81,
  elements: [
    {
      ...defaultIcon,
      id: uuid(),
      widgetId: warnUuid7, // new gaze implemention needs this (for now)
      src: threatRadarSmReg,
      w: 80,
      h: 81,
    },
  ],
};

const warn8: MapWarningWidget = {
  ...defaultWidget,
  id: warnUuid8,
  x: 1600,
  y: 350,
  w: 80,
  h: 81,
  elements: [
    {
      ...defaultIcon,
      id: uuid(),
      widgetId: warnUuid8, // new gaze implemention needs this (for now)
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

const ownshipUuid = uuid();
const droneUuid1 = uuid();
const droneUuid2 = uuid();
const droneUuid3 = uuid();
const droneUuid4 = uuid();
const droneUuid5 = uuid();

export const ownship: Widget = {
  ...lpdHelper.generateVehicleWidget(
    lpdHelper.generateBaseWidget(
      ownshipUuid,
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
          lpdHelper.generateBaseElement(
            uuid(),
            'visual',
            50,
            50,
            undefined,
            ownshipUuid,
          ),
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
        droneUuid1,
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
            lpdHelper.generateBaseElement(
              uuid(),
              'visual',
              50,
              50,
              undefined,
              droneUuid1,
            ),
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
        droneUuid2,
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
            lpdHelper.generateBaseElement(
              uuid(),
              'visual',
              50,
              50,
              undefined,
              droneUuid2,
            ),
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
        droneUuid3,
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
            lpdHelper.generateBaseElement(
              uuid(),
              'visual',
              50,
              50,
              undefined,
              droneUuid3,
            ),
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
        droneUuid4,
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
            lpdHelper.generateBaseElement(
              uuid(),
              'visual',
              50,
              50,
              undefined,
              droneUuid4,
            ),
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
        droneUuid5,
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
            lpdHelper.generateBaseElement(
              uuid(),
              'visual',
              50,
              50,
              undefined,
              droneUuid5,
            ),
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
  sections: [...initialSections],
  widgets: { ...initialShips, ...initailMapWarnings, ...initialWidgets },
};

export default initialLPD;