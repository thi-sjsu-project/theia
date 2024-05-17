import { v4 as uuid } from 'uuid';
import OWNSHIP_LOGO from 'src/assets/icons/ownship.svg';
import DRONE_LOGO from 'src/assets/icons/drone.svg';
import type { Widget, WidgetMap } from 'src/types/widget';
import lpdHelper from 'src/utils/lpdHelper';

const ownshipUuid = uuid();
const droneUuid1 = uuid();
const droneUuid2 = uuid();
const droneUuid3 = uuid();
const droneUuid4 = uuid();
const droneUuid5 = uuid();

const ownship: Widget = {
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
        ),
      ],
      undefined,
      undefined,
      undefined,
      ['ownship']
    ),
    0,
    1.5,
    0.2 * Math.PI, // 36deg
  ),
};

const drones: Widget[] = [
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
          ),
        ],
        undefined,
        undefined,
        undefined,
        ['drone', 'aca1'],
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
          ),
        ],
        undefined,
        undefined,
        undefined,
        ['drone', 'aca2'],
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
          ),
        ],
        undefined,
        undefined,
        undefined,
        ['drone', 'aca3'],
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
          ),
        ],
        undefined,
        undefined,
        undefined,
        ['drone', 'aca4'],
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
          ),
        ],
        undefined,
        undefined,
        undefined,
        ['drone', 'aca5'],
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

export { ownship, drones, initialShips };
