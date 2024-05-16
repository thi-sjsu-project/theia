import type {
  Message,
  MissileToOwnshipDetected,
  RequestApprovalToAttack,
} from 'src/types/schema-types';
import lpdHelper from 'src/utils/lpdHelper';
import { v4 as uuid } from 'uuid';
import DANGER_ICON from 'src/assets/icons/danger.svg';
import { elements } from './lowLPD';
import { type Widget } from 'src/types/widget';

// Functions to create widgets, elements, and sections for each message type
const requestApprovalToAttackMessageMedium = (
  message: RequestApprovalToAttack,
) => {
  elements.push(
    lpdHelper.generateRequestApprovalElement(
      lpdHelper.generateBaseElement(uuid(), 'visual', 30, 30, message.priority),
      message,
      lpdHelper.generateIconElement(
        lpdHelper.generateBaseElement(uuid(), 'visual', 80, 80),
        DANGER_ICON,
      ),
      lpdHelper.generateButtonElement(
        lpdHelper.generateBaseElement(uuid(), 'visual', 30, 80),
        'Deny',
      ),
      lpdHelper.generateButtonElement(
        lpdHelper.generateBaseElement(uuid(), 'visual', 30, 80),
        'Approve',
      ),
    ),
  );
  return {
    sections: [],
    possibleWidgets: [
      lpdHelper.generateListWidget(
        lpdHelper.generateBaseWidget(
          'list',
          'tinder',
          100,
          100,
          300,
          800,
          '/pearce-screen',
          false,
          false,
          1,
          [...elements],
        ),
      ),
    ],
  };
};

const acaFuelLowMessageMedium = (message: Message) => {
  elements.push(
    lpdHelper.generateTableElement(
      lpdHelper.generateBaseElement(
        uuid(),
        'visual',
        50,
        200,
        message.priority,
      ),
      2,
      2,
      [
        ['Fuel', 'Low'],
        ['Altitude', 'Low'],
      ],
    ),
  );
  return {
    sections: [],
    possibleWidgets: [
      lpdHelper.generateListWidget(
        lpdHelper.generateBaseWidget(
          'list',
          'tinder',
          500,
          500,
          300,
          800,
          '/pearce-screen',
          false,
          false,
          1,
          [...elements],
        ),
      ),
    ],
  };
};

const missileToOwnshipDetectedMessageMedium = (
  message: MissileToOwnshipDetected,
) => {
  elements.push(
    lpdHelper.generateMissileIncomingElement(
      lpdHelper.generateBaseElement(
        uuid(),
        'visual',
        50,
        200,
        message.priority,
      ),
      message,
      lpdHelper.generateIconElement(
        lpdHelper.generateBaseElement(uuid(), 'visual', 80, 80),
        DANGER_ICON,
      ),
    ),
  );
  return {
    sections: [],
    possibleWidgets: [
      lpdHelper.generateListWidget(
        lpdHelper.generateBaseWidget(
          'list',
          'tinder',
          100,
          100,
          300,
          800,
          '/pearce-screen',
          false,
          true,
          1,
          [...elements],
        ),
      ),
    ],
  };
};

const acaDefectMessageMedium = (message: Message) => {
  elements.push(
    lpdHelper.generateTableElement(
      lpdHelper.generateBaseElement(
        uuid(),
        'visual',
        50,
        200,
        message.priority,
      ),
      2,
      2,
      [
        ['Defect', 'Engine'],
        ['Altitude', 'Low'],
      ],
    ),
  );
  return {
    sections: [],
    possibleWidgets: [
      lpdHelper.generateListWidget(
        lpdHelper.generateBaseWidget(
          'list',
          'tinder',
          500,
          500,
          300,
          800,
          '/pearce-screen',
          false,
          true,
          1,
          [...elements],
        ),
      ),
    ],
  };
};

const acaHeadingToBaseMessageMedium = (message: Message) => {
  elements.push(
    lpdHelper.generateTextElement(
      lpdHelper.generateBaseElement(
        uuid(),
        'visual',
        30,
        200,
        message.priority,
      ),
      'Aircraft heading to base',
    ),
  );
  return {
    sections: [],
    possibleWidgets: [
      lpdHelper.generateListWidget(
        lpdHelper.generateBaseWidget(
          'list',
          'tinder',
          500,
          500,
          300,
          800,
          '/pearce-screen',
          false,
          true,
          1,
          [...elements],
        ),
      ),
    ],
  };
};

// Map each message type to its corresponding LPD function
const mediumLPDMessageFunctions: any = {
  RequestApprovalToAttack: requestApprovalToAttackMessageMedium,
  AcaFuelLow: acaFuelLowMessageMedium,
  AcaDefect: acaDefectMessageMedium,
  AcaHeadingToBase: acaHeadingToBaseMessageMedium,
  MissileToOwnshipDetected: missileToOwnshipDetectedMessageMedium,
};

const mediumLPD = (message: Message) => {
  if (message.priority != -1)
    return mediumLPDMessageFunctions[message.kind](message);

  //we can return all widgets in this LPD
  const tempMessage = <RequestApprovalToAttack>{
    priority: 2,
  };
  const messageKinds = [
    'RequestApprovalToAttack',
    'AcaFuelLow',
    'AcaDefect',
    'AcaHeadingToBase',
    'MissileToOwnshipDetected',
  ];
  let allPossibleWidgets: any = [];
  messageKinds.forEach((kind) => {
    mediumLPDMessageFunctions[kind](tempMessage).possibleWidgets.forEach(
      (widget: Widget) => {
        allPossibleWidgets.push(widget);
      },
    );
  });
  return allPossibleWidgets;
};

export default mediumLPD;
