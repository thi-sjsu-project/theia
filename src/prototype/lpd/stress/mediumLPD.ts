import type { Message, MissileToOwnshipDetected, RequestApprovalToAttack } from "src/types/schema-types";
import lpdHelper from "src/utils/lpdHelper";
import { v4 as uuid } from 'uuid';
import DANGER_ICON from 'src/assets/icons/danger.svg';
import { elements } from './lowLPD';

// Functions to create widgets, elements, and sections for each message type
const requestApprovalToAttackMessageMedium = (message: RequestApprovalToAttack) => {
  elements.push(
    lpdHelper.generateRequestApprovalElement(
      lpdHelper.generateBaseElement(
        uuid(),
        'visual',
        30,
        30,
        0,
        0,
        message.priority,
      ),
      message,
      lpdHelper.generateIconElement(
        lpdHelper.generateBaseElement(
          uuid(),
          'visual',
          80,
          80,
          0,
          0,
        ),
        DANGER_ICON,
      ),
      lpdHelper.generateButtonElement(
        lpdHelper.generateBaseElement(uuid(), 'visual', 30, 80, 0, 0),
        'Deny',
      ),
      lpdHelper.generateButtonElement(
        lpdHelper.generateBaseElement(uuid(), 'visual', 30, 80, 0, 0),
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
      lpdHelper.generateBaseElement(uuid(), 'visual', 50, 200, 0, 0, message.priority),
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

const missileToOwnshipDetectedMessageMedium = (message: MissileToOwnshipDetected) => {
  elements.push(
    lpdHelper.generateMissileIncomingElement(
      lpdHelper.generateBaseElement(
        uuid(),
        'visual',
        50,
        200,
        0,
        0,
        message.priority,
      ),
      message,
      lpdHelper.generateIconElement(
        lpdHelper.generateBaseElement(uuid(), 'visual', 80, 80, 0, 0),
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
      lpdHelper.generateBaseElement(uuid(), 'visual', 50, 200, 0, 0, message.priority),
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
      lpdHelper.generateBaseElement(uuid(), 'visual', 30, 200, 0, 0, message.priority),
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
  return mediumLPDMessageFunctions[message.kind](message);
};

export default mediumLPD;