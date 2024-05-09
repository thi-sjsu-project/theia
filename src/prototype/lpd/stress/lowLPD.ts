import type { Message } from "src/types/schema-types";
import lpdHelper from "src/utils/lpdHelper";
import { v4 as uuid } from 'uuid';
import WARNING_LOGO from "src/icons/warning-5-256.ico"
import { l } from "node_modules/vite/dist/node/types.d-aGj9QkWt";

export const MissileToOwnshipDetected_ID = uuid();
export const acaFuelLow_ID = uuid();


// Functions to create widgets, elements, and sections for each message type
const requestApprovalToAttackMessageLow = () => {
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

const acaFuelLowMessageLow = () => {
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

const missileToOwnshipDetectedMessageLow = () => {
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

const acaDefectMessageLow = () => {
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

const acaHeadingToBaseMessageLow = () => {
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
const lowLPDMessageFunctions: any = {
    'RequestApprovalToAttack': requestApprovalToAttackMessageLow,
    'AcaFuelLow': acaFuelLowMessageLow,
    'AcaDefect': acaDefectMessageLow,
    'AcaHeadingToBase': acaHeadingToBaseMessageLow,
    'MissileToOwnshipDetected': missileToOwnshipDetectedMessageLow,
}

const lowLPD = (message: Message) => {
    return lowLPDMessageFunctions[message.kind]();
};

export default lowLPD;