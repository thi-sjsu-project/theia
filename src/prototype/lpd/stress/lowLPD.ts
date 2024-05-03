import type { Message } from "src/types/schema-types";
import lpdHelper from "src/utils/lpdHelper";
import { v4 as uuid } from 'uuid';
import WARNING_LOGO from "src/icons/warning-5-256.ico"

export const MissileToOwnshipDetected_ID = uuid();
export const acaFuelLow_ID = uuid();

// Functions to create widgets, elements, and sections for each message type
const requestApprovalToAttackMessageLow = () => {
    return {
        sections: [],
        possibleWidgets: [lpdHelper.generateWidget(
            uuid(),
            'request',
            100,
            100,
            200,
            200,
            false,
            false,
            1,
            [],
        )],
    };
}

const acaFuelLowMessageLow = () => {
    return {
        sections: [],
        possibleWidgets: [lpdHelper.generateWidget(
            acaFuelLow_ID,
            'message',
            500,
            500,
            150,
            150,
            false,
            false,
            1,
            [
              lpdHelper.generateTextElement(
                lpdHelper.generateBaseElement(
                    uuid(),
                    'visual',
                    150,
                    100,
                    0,
                    0,
                    undefined, 
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    false,
                    true,
                    {
                        background: "black",
                        color: "#02d118"
                    }
                ),
                "Low stress: ACA fuel low. Do you want to send it back to base?"
            ),
            lpdHelper.generateButtonElement(
                lpdHelper.generateBaseElement(
                    uuid(),
                    'visual',
                    25,
                    40,
                    0, 
                    125,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    false,
                    true,
                    {
                        background: "#02d118",
                        color: "black",
                        margin: "0 20px 0 0",
                        textAlign: "center"
                    }
                ),
                "Send"
            ),
            lpdHelper.generateButtonElement(
                lpdHelper.generateBaseElement(
                    uuid(),
                    'visual',
                    25,
                    40,
                    30, 
                    125,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    false,
                    true,
                    {
                        background: "#02d118",
                        color: "black"
                    }
                ),
                "Stay"
            )
        
            ],
        )],
    };
}

const missileToOwnshipDetectedMessageLow = () => {
    return {
      sections: [],
      possibleWidgets: [
        lpdHelper.generateWidget(
          MissileToOwnshipDetected_ID,
          'highWarning',
          100,
          100,
          200,
          200,
          false,
          true,
          1,
          [
            lpdHelper.generateIconElement(
              lpdHelper.generateBaseElement(
                uuid(),
                'visual',
                100,
                100,
                0,
                0,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                false,
                false,
                // Blinking icon? Is it possible in Tailwind without defining blink animation?
                {
                  display: 'block',
                  margin: 'auto',
                  width: '50%',
                },
              ),
              WARNING_LOGO,
              'warning',
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
      ],
    };
}

const acaDefectMessageLow = () => {
    return {
        sections: [],
        possibleWidgets: [lpdHelper.generateWidget(
            uuid(),
            'highWarning',
            500,
            500,
            20,
            200,
            false,
            true,
            1,
            [],
        )],
    };
}

const acaHeadingToBaseMessageLow = () => {
    return {
        sections: [],
        possibleWidgets: [lpdHelper.generateWidget(
            uuid(),
            'message',
            500,
            500,
            20,
            200,
            false,
            true,
            1,
            [],
        )],
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