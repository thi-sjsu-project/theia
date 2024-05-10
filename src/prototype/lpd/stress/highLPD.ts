import type { Message, MissileToOwnshipDetected, RequestApprovalToAttack } from "src/types/schema-types";
import { v4 as uuid } from 'uuid';
import lpdHelper from "src/utils/lpdHelper";
import DANGER_ICON from 'src/icons/danger.svg';
import DRONE_ICON from 'src/icons/drone.svg';
import { elements } from "./lowLPD";

// Functions to create widgets, elements, and sections for each message type
const requestApprovalToAttackMessageHigh = (message: RequestApprovalToAttack) => {
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

const acaFuelLowMessageHigh = (message: Message) => {
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

const missileToOwnshipDetectedMessageHigh = (message: MissileToOwnshipDetected) => {
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

const acaDefectMessageHigh = (message: Message) => {
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
          'highWarning',
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