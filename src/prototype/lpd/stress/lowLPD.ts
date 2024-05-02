import type { Message } from "src/types/schema-types";
import lpdHelper from "src/utils/lpdHelper";

// Functions to create widgets, elements, and sections for each message type
const requestApprovalToAttackMessageLow = () => {
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

const acaFuelLowMessageLow = () => {
    return {
        sections: [],
        possibleWidgets: [lpdHelper.generateWidget(
            'message',
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

const missileToOwnshipDetectedMessageLow = () => {
    return {
        sections: [],
        possibleWidgets: [lpdHelper.generateWidget(
            'missileDetected',
            'highWarning',
            100,
            100,
            200,
            200,
            false,
            true,
            1,
            [
                lpdHelper.generateTextElement(
                    lpdHelper.generateBaseElement(
                        'textElement',
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
                        undefined,
                        undefined,
                        {
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: 'black',
                            border: 'solid',
                            borderColor: 'black',
                            // borderColor: '#16fd22',
                        },
                    ),
                    'Missile Detected!',
                ),
            ],
        )],
    };
}

const acaDefectMessageLow = () => {
    return {
        sections: [],
        possibleWidgets: [lpdHelper.generateWidget(
            'highWarning',
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
            'message',
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