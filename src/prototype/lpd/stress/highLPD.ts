import type { Message } from "src/types/schema-types";
import { v4 as uuid } from 'uuid';
import lpdHelper from "src/utils/lpdHelper";
import WARNING_LOGO from "src/icons/warning-5-256.ico"
import { MissileToOwnshipDetected_ID, acaFuelLow_ID } from "./lowLPD";

// Functions to create widgets, elements, and sections for each message type
const requestApprovalToAttackMessageHigh = () => {
    return {
        sections: [],
        possibleWidgets: [lpdHelper.generateWidget(
            'request',
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

const acaFuelLowMessageHigh = () => {
    return {
        sections: [],
        possibleWidgets: [lpdHelper.generateWidget(
            acaFuelLow_ID,
            'message',
            500,
            500,
            20,
            20,
            true,
            true,
            1,
            [
              lpdHelper.generateTextElement(
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
                    true,
                    {
                        background: "black",
                        color: "#02d118"
                    }
                ),
                "High Stress: ACA fuel low. Heading back to base now."
            )
        
            ],
        )],
    };
}

export const missileToOwnshipDetectedMessageHigh = () => {
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
                300,
                300,
                0,
                0,
                undefined,
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
              'High Stress: Missile to ownship detected! T-30 till impact',
            ),
          ],
        ),
      ],
    };
}

const acaDefectMessageHigh = () => {
    return {
        sections: [],
        possibleWidgets: [lpdHelper.generateWidget(
            'acaDefect',
            'message',
            100,
            100,
            200,
            200,
            false,
            true,
            1,
            [],
        )],
    };
}

const acaHeadingToBaseMessageHigh = () => {
    return {
        sections: [],
        possibleWidgets: [lpdHelper.generateWidget(
            'acaHeadingToBase',
            'message',
            100,
            100,
            200,
            200,
            false,
            true,
            1,
            [],
        )],
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