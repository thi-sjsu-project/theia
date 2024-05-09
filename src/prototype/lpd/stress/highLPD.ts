import type { Message } from "src/types/schema-types";
import { v4 as uuid } from 'uuid';
import lpdHelper from "src/utils/lpdHelper";
import WARNING_LOGO from "src/icons/warning-5-256.ico"
import { MissileToOwnshipDetected_ID, acaFuelLow_ID } from "./lowLPD";

// Functions to create widgets, elements, and sections for each message type
const requestApprovalToAttackMessageHigh = () => {
  return {
      sections: [],
      possibleWidgets: [lpdHelper.generateListWidget(lpdHelper.generateBaseWidget(
          uuid(),
          'request',
          100,
          100,
          200,
          200,
          '/pearce-screen',
          false,
          false,
          1,
          [
              lpdHelper.generateIconElement(lpdHelper.generateBaseElement(
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
              'DRONE_ICON',
          ),
              lpdHelper.generateButtonElement(lpdHelper.generateBaseElement(
                  uuid(),
                  'visual',
                  30,
                  80,
                  0,
                  0,
              ), 
              'Deny',
          ),
              lpdHelper.generateButtonElement(lpdHelper.generateBaseElement(
                  uuid(),
                  'visual',
                  30,
                  80,
                  0,
                  0,
              ),
              'Approve',),
          ],
      ))],
  };
}

const acaFuelLowMessageHigh = () => {
  return {
      sections: [],
      possibleWidgets: [lpdHelper.generateListWidget(lpdHelper.generateBaseWidget(
          acaFuelLow_ID,
          'message',
          500,
          500,
          150,
          150,
          '/minimap',
          false,
          false,
          1,
          [
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
          ],
      ))],
  };
}

const missileToOwnshipDetectedMessageHigh = () => {
  return {
    sections: [],
    possibleWidgets: [
      lpdHelper.generateListWidget(lpdHelper.generateBaseWidget(
        MissileToOwnshipDetected_ID,
        'highWarning',
        100,
        100,
        200,
        200,
        '/pearce-screen',
        false,
        true,
        1,
        [
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
        ],
        undefined,
        undefined,
      ),
    )],
  };
}

const acaDefectMessageHigh = () => {
  return {
      sections: [],
      possibleWidgets: [lpdHelper.generateListWidget(lpdHelper.generateBaseWidget(
          uuid(),
          'highWarning',
          500,
          500,
          20,
          200,
          '/pearce-screen',
          false,
          true,
          1,
          [
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
          ],
      ))],
  };
}

const acaHeadingToBaseMessageHigh = () => {
  return {
      sections: [],
      possibleWidgets: [lpdHelper.generateListWidget(lpdHelper.generateBaseWidget(
          uuid(),
          'message',
          500,
          500,
          20,
          200,
          '/pearce-screen',
          false,
          true,
          1,
          [
              lpdHelper.generateTextElement(lpdHelper.generateBaseElement(
                  uuid(),
                  'visual',
                  30,
                  200,
                  0,
                  0,
              ),
              'Aircraft heading to base'),
          ],
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