import type { Message } from "src/types/schema-types";
import lpdHelper from "src/utils/lpdHelper";
import { v4 as uuid } from 'uuid';
import WARNING_LOGO from "src/icons/warning-5-256.ico"
import { MissileToOwnshipDetected_ID, acaFuelLow_ID } from "./lowLPD";

// Functions to create widgets, elements, and sections for each message type
const requestApprovalToAttackMessageMedium = () => {
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

const acaFuelLowMessageMedium = () => {
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
                "Medium stress: ACA fuel low. Heading back to base in 1 minute."
            ),
            lpdHelper.generateButtonElement(
                lpdHelper.generateBaseElement(
                    uuid(),
                    'visual',
                    25,
                    50,
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
                        color: "black"
                    }
                ),
                "Cancel"
            )
        
            ],
        )],
    };
}

const missileToOwnshipDetectedMessageMedium = () => {
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
              'Medium Stress: Missile to ownship detected! T-30 till impact',
            ),
          ],
        ),
      ],
    };
}

const acaDefectMessageMedium = () => {
    return {
        sections: [],
        possibleWidgets: [lpdHelper.generateWidget(
            uuid(),
            'message',
            500,
            500,
            20,
            20,
            true,
            true,
            1,
            [],
        )],
    };
}

const acaHeadingToBaseMessageMedium = () => {
    return {
        sections: [],
        possibleWidgets: [lpdHelper.generateWidget(
            uuid(),
            'message',
            500,
            500,
            20,
            20,
            true,
            true,
            1,
            [],
        )],
    };
}

// Map each message type to its corresponding LPD function
const mediumLPDMessageFunctions = {
    'RequestApprovalToAttack': requestApprovalToAttackMessageMedium,
    'AcaFuelLow': acaFuelLowMessageMedium,
    'MissileToOwnshipDetected': missileToOwnshipDetectedMessageMedium,
    'AcaDefect': acaDefectMessageMedium,
    'AcaHeadingToBase': acaHeadingToBaseMessageMedium,
};

const mediumLPD = (message: Message) => {
    return mediumLPDMessageFunctions[message.kind]();
}

export default mediumLPD;