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
const droneUuid7 = uuid();

const ownship: Widget = {
  ...lpdHelper.generateVehicleWidget(
    lpdHelper.generateBaseWidget(
      ownshipUuid,
      'minimap',
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
      ['ownship'],
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
        'minimap',
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
            'ACA-1',
          ),
        ],
        ['specify', 'aca', 'aca-1'],
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
        'minimap',
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
            'ACA-2',
          ),
        ],
        ['specify', 'aca', 'aca-2'],
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
        'minimap',
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
            'ACA-3',
          ),
        ],
        ['specify', 'aca', 'aca-3'],
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
        'minimap',
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
            'ACA-4',
          ),
        ],
        ['specify', 'aca', 'aca-4'],
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
        'minimap',
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
            'ACA-5',
          ),
        ],
        ['specify', 'aca', 'aca-5'],
      ),
      5,
      Math.random() * 0.5 + 0.25,
      Math.random() * Math.PI,
    ),
  },
  {
    ...lpdHelper.generateVehicleWidget(
      lpdHelper.generateBaseWidget(
        droneUuid7,
        'minimap',
        500,
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
              droneUuid7,
            ),
            DRONE_LOGO,
            'ACA-7',
          ),
        ],
        ['specify', 'aca', 'aca-7'],
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
  [drones[5].id]: drones[5],
};

export { ownship, drones, initialShips };
