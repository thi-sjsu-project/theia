import type { Message } from "src/types/schema-types";
import { v4 as uuid } from 'uuid';
import lpdHelper from "src/utils/lpdHelper";
import DANGER_ICON from 'src/icons/danger.svg';
import DRONE_ICON from 'src/icons/drone.svg';
import type { Element } from "src/types/element";
import { elements } from "./lowLPD";

export const MissileToOwnshipDetected_ID = uuid();
export const acaFuelLow_ID = uuid();

// Functions to create widgets, elements, and sections for each message type
const requestApprovalToAttackMessageHigh = () => {
    elements.push(
      lpdHelper.generateIconElement(
        lpdHelper.generateBaseElement(
          uuid(),
          'visual',
          30,
          30,
          0,
          0,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
        ),
        DRONE_ICON,
      ),
      lpdHelper.generateButtonElement(
        lpdHelper.generateBaseElement(uuid(), 'visual', 30, 80, 0, 0),
        'Deny',
      ),
      lpdHelper.generateButtonElement(
        lpdHelper.generateBaseElement(uuid(), 'visual', 30, 80, 0, 0),
        'Approve',
      ),
    );
  return {
      sections: [],
      possibleWidgets: [lpdHelper.generateListWidget(lpdHelper.generateBaseWidget(
          'list',
          'request',
          100,
          100,
          200,
          200,
          '/pearce-screen',
          false,
          false,
          1,
          elements,
      ))],
  };
}

const acaFuelLowMessageHigh = () => {
    elements.push(
        lpdHelper.generateTableElement(lpdHelper.generateBaseElement(
            uuid(),
            'visual',
            50,
            200,
            0,
            0,
        ),
        2,
        2,
        [['Fuel', 'Low'],['Altitude', 'Low']],
        )
    );
  return {
      sections: [],
      possibleWidgets: [lpdHelper.generateListWidget(lpdHelper.generateBaseWidget(
          'list',
          'message',
          500,
          500,
          150,
          150,
          '/pearce-screen',
          false,
          false,
          1,
          elements,
      ))],
  };
}

const missileToOwnshipDetectedMessageHigh = () => {
    elements.push(
        lpdHelper.generateIconElement(
            lpdHelper.generateBaseElement(
              uuid(),
              'visual',
              80,
              80,
              0,
              0,
              undefined,
              undefined,
              undefined,
              undefined,
              false,
              false,
              {
                display: 'block',
                margin: 'auto',
                width: '50%',
              },
            ),
            'DANGER_ICON',
          ),
          lpdHelper.generateTextElement(
            lpdHelper.generateBaseElement(
              uuid(),
              'visual',
              70,
              200,
              75,
              0,
              undefined,
              undefined,
              undefined,
              undefined,
              false,
              false,
              {
                background: 'black',
                color: '#02d118',
                fontWeight: 'bold',
                fontSize: '16px',
              },
            ),
            'Low Stress: Missile to ownship detected! T-30 till impact',
          ),
      );
  return {
    sections: [],
    possibleWidgets: [
      lpdHelper.generateListWidget(lpdHelper.generateBaseWidget(
        'list',
        'highWarning',
        100,
        100,
        200,
        200,
        '/pearce-screen',
        false,
        true,
        1,
        elements,
      ),
    )],
  };
}

const acaDefectMessageHigh = () => {
  elements.push(
    lpdHelper.generateTableElement(lpdHelper.generateBaseElement(
      uuid(),
      'visual',
      50,
      200,
      0,
      0,
    ),
      2,
      2,
      [['Defect', 'Engine'], ['Altitude', 'Low']]),
  );
  return {
    sections: [],
    possibleWidgets: [lpdHelper.generateListWidget(lpdHelper.generateBaseWidget(
      'list',
      'highWarning',
      500,
      500,
      20,
      200,
      '/pearce-screen',
      false,
      true,
      1,
      elements,
    ))],
  };
}

const acaHeadingToBaseMessageHigh = () => {
  elements.push(
    lpdHelper.generateTextElement(lpdHelper.generateBaseElement(
      uuid(),
      'visual',
      30,
      200,
      0,
      0,
    ),
      'Aircraft heading to base'),
  );
  return {
    sections: [],
    possibleWidgets: [lpdHelper.generateListWidget(lpdHelper.generateBaseWidget(
      'list',
      'message',
      500,
      500,
      20,
      200,
      '/pearce-screen',
      false,
      true,
      1,
      elements,
    ))],
  };
}

// Map each message type to its corresponding LPD function
const highLPDMessageFunctions = {
  'RequestApprovalToAttack': requestApprovalToAttackMessageHigh,
  'AcaFuelLow': acaFuelLowMessageHigh,
  'MissileToOwnshipDetected': missileToOwnshipDetectedMessageHigh,
  'AcaDefect': acaDefectMessageHigh,
  'AcaHeadingToBase': acaHeadingToBaseMessageHigh,
};

const highLPD = (message: Message) => {
    return highLPDMessageFunctions[message.kind]();
}

export default highLPD;