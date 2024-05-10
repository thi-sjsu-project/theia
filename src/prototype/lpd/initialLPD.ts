import { v4 as uuid } from 'uuid';
import OWNSHIP_LOGO from 'src/icons/currentPosition.svg';
import DRONE_LOGO from 'src/icons/drone.svg';
import type { Widget, WidgetMap } from 'src/types/widget';
import lpdHelper from 'src/utils/lpdHelper';

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
        50,
        50,
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
    ),
  },
  {
    ...lpdHelper.generateVehicleWidget(
      lpdHelper.generateBaseWidget(
        uuid(),
        'vehicle',
        1500,
        550,
        50,
        50,
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
    ),
  },
  {
    ...lpdHelper.generateVehicleWidget(
      lpdHelper.generateBaseWidget(
        uuid(),
        'vehicle',
        1500,
        350,
        50,
        50,
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
    ),
  },
  {
    ...lpdHelper.generateVehicleWidget(
      lpdHelper.generateBaseWidget(
        uuid(),
        'vehicle',
        200,
        900,
        50,
        50,
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
    ),
  },
  {
    ...lpdHelper.generateVehicleWidget(
      lpdHelper.generateBaseWidget(
        uuid(),
        'vehicle',
        1150,
        750,
        50,
        50,
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
  widgets: initialShips,
};

export default initialLPD;