import type { Message, MissileToOwnshipDetected, RequestApprovalToAttack } from 'src/types/schema-types';
import lpdHelper from 'src/utils/lpdHelper';
import { v4 as uuid } from 'uuid';
import type { Element } from 'src/types/element';
import DANGER_ICON from 'src/assets/icons/danger.svg';

export const elements: Element[] = [];

// Functions to create widgets, elements, and sections for each message type
const requestApprovalToAttackMessageLow = (message: RequestApprovalToAttack) => {
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

const acaFuelLowMessageLow = (message: Message) => {
  elements.push(
    lpdHelper.generateTableElement(
      lpdHelper.generateBaseElement(uuid(), 'visual', 50, 200, message.priority),
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

const missileToOwnshipDetectedMessageLow = (message: MissileToOwnshipDetected) => {
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

const acaDefectMessageLow = (message: Message) => {
  elements.push(
    lpdHelper.generateTableElement(
      lpdHelper.generateBaseElement(uuid(), 'visual', 50, 200, message.priority),
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

const acaHeadingToBaseMessageLow = (message: Message) => {
  elements.push(
    lpdHelper.generateTextElement(
      lpdHelper.generateBaseElement(uuid(), 'visual', 30, 200, message.priority),
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
const lowLPDMessageFunctions: any = {
  RequestApprovalToAttack: requestApprovalToAttackMessageLow,
  AcaFuelLow: acaFuelLowMessageLow,
  AcaDefect: acaDefectMessageLow,
  AcaHeadingToBase: acaHeadingToBaseMessageLow,
  MissileToOwnshipDetected: missileToOwnshipDetectedMessageLow,
};

const lowLPD = (message: Message) => {
  return lowLPDMessageFunctions[message.kind](message);
};

export default lowLPD;