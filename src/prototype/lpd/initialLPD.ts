import { v4 as uuid } from 'uuid';
import type { IconElement } from 'src/types/element';
import OWNSHIP_LOGO from 'src/icons/currentPosition.svg';
import DRONE_LOGO from 'src/icons/drone.svg';
import type { Widget, WidgetMap } from 'src/types/widget';
import lpdHelper from 'src/utils/lpdHelper';

export const ownship: Widget = {
  ...lpdHelper.generateWidget(
    uuid(),
    'vehicle',
    400,
    950,
    50,
    50,
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
};

export const drones: Widget[] = [
  lpdHelper.generateWidget(
    uuid(),
    'vehicle',
    500,
    200,
    50,
    50,
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
  lpdHelper.generateWidget(
    uuid(),
    'vehicle',
    1500,
    550,
    50,
    50,
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
  lpdHelper.generateWidget(
    uuid(),
    'vehicle',
    1500,
    350,
    50,
    50,
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
  lpdHelper.generateWidget(
    uuid(),
    'vehicle',
    200,
    900,
    50,
    50,
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
  lpdHelper.generateWidget(
    uuid(),
    'vehicle',
    1150,
    750,
    50,
    50,
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
];

const initialShips: WidgetMap = {
  [ownship.id]: ownship,
  ...drones.reduce((acc, drone) => {
    acc[drone.id] = drone;
    return acc;
  }, {} as WidgetMap),
};

const initialLPD = {
  sections: [
    lpdHelper.generateSection(uuid(), 50, 40, 350, 900, 10, 'tinder', []),
    lpdHelper.generateSection(uuid(), 50, 850, 800, 200, 10, 'request', []),
    lpdHelper.generateSection(
      uuid(),
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
      1800,
      450,
      500,
      200,
      10,
      'lowWarning',
      [],
    ),
    lpdHelper.generateSection(uuid(), 1800, 200, 200, 200, 10, 'message', []),
  ],
  widgets: initialShips,
  // widgets: [
    // // Ownship
    // lpdHelper.generateWidget(
    //   uuid(),
    //   'vehicle',
    //   400,
    //   950,
    //   50,
    //   50,
    //   false,
    //   false,
    //   1,
    //   [
    //     lpdHelper.generateIconElement(
    //       lpdHelper.generateBaseElement(uuid(), 'visual', 50, 50, 0, 0),
    //       OWNSHIP_LOGO,
    //       'ownship',
    //     ),
    //   ],
    // ),

    // // Drones
    // lpdHelper.generateWidget(
    //   uuid(),
    //   'vehicle',
    //   500,
    //   200,
    //   50,
    //   50,
    //   false,
    //   false,
    //   10,
    //   [
    //     lpdHelper.generateIconElement(
    //       lpdHelper.generateBaseElement(uuid(), 'visual', 50, 50, 0, 0),
    //       DRONE_LOGO,
    //       'drone',
    //     ),
    //   ],
    // ),
    // lpdHelper.generateWidget(
    //   uuid(),
    //   'vehicle',
    //   1500,
    //   550,
    //   50,
    //   50,
    //   false,
    //   false,
    //   10,
    //   [
    //     lpdHelper.generateIconElement(
    //       lpdHelper.generateBaseElement(uuid(), 'visual', 50, 50, 0, 0),
    //       DRONE_LOGO,
    //       'drone',
    //     ),
    //   ],
    // ),
    // lpdHelper.generateWidget(
    //   uuid(),
    //   'vehicle',
    //   1500,
    //   350,
    //   50,
    //   50,
    //   false,
    //   false,
    //   10,
    //   [
    //     lpdHelper.generateIconElement(
    //       lpdHelper.generateBaseElement(uuid(), 'visual', 50, 50, 0, 0),
    //       DRONE_LOGO,
    //       'drone',
    //     ),
    //   ],
    // ),
    // lpdHelper.generateWidget(
    //   uuid(),
    //   'vehicle',
    //   200,
    //   900,
    //   50,
    //   50,
    //   false,
    //   false,
    //   10,
    //   [
    //     lpdHelper.generateIconElement(
    //       lpdHelper.generateBaseElement(uuid(), 'visual', 50, 50, 0, 0),
    //       DRONE_LOGO,
    //       'drone',
    //     ),
    //   ],
    // ),
    // lpdHelper.generateWidget(
    //   uuid(),
    //   'vehicle',
    //   1150,
    //   750,
    //   50,
    //   50,
    //   false,
    //   false,
    //   10,
    //   [
    //     lpdHelper.generateIconElement(
    //       lpdHelper.generateBaseElement(uuid(), 'visual', 50, 50, 0, 0),
    //       DRONE_LOGO,
    //       'drone',
    //     ),
    //   ],
};

export default initialLPD;