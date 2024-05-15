import type {
  Message,
  MissileToOwnshipDetected,
  RequestApprovalToAttack,
} from 'src/types/schema-types';
import { v4 as uuid } from 'uuid';
import lpdHelper from 'src/utils/lpdHelper';
import DANGER_ICON from 'src/assets/icons/danger.svg';
import { elements } from './lowLPD';

// Functions to create widgets, elements, and sections for each message type
const requestApprovalToAttackMessageHigh = (
  message: RequestApprovalToAttack,
) => {
  elements.push(
    lpdHelper.generateRequestApprovalElement(
      lpdHelper.generateBaseElement(uuid(), 'visual', 30, 30, message.priority, 'list'),
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

const acaFuelLowMessageHigh = (message: Message) => {
  elements.push(
    lpdHelper.generateTableElement(
      lpdHelper.generateBaseElement(
        uuid(),
        'visual',
        50,
        200,
        message.priority,
        'list',
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

const missileToOwnshipDetectedMessageHigh = (
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
        'list',
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

const acaDefectMessageHigh = (message: Message) => {
  elements.push(
    lpdHelper.generateTableElement(
      lpdHelper.generateBaseElement(
        uuid(),
        'visual',
        50,
        200,
        message.priority,
        'list',
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
          'vehicle',
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

const acaHeadingToBaseMessageHigh = (message: Message) => {
  elements.push(
    lpdHelper.generateTextElement(
      lpdHelper.generateBaseElement(
        uuid(),
        'visual',
        30,
        200,
        message.priority,
        'list',
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
const highLPDMessageFunctions: any = {
  RequestApprovalToAttack: requestApprovalToAttackMessageHigh,
  AcaFuelLow: acaFuelLowMessageHigh,
  MissileToOwnshipDetected: missileToOwnshipDetectedMessageHigh,
  AcaDefect: acaDefectMessageHigh,
  AcaHeadingToBase: acaHeadingToBaseMessageHigh,
};

const highLPD = (message: Message) => {
  return highLPDMessageFunctions[message.kind](message);
};

export default highLPD;
