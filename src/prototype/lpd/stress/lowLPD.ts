import type { Message } from "src/types/schema-types";
import lpdHelper from "src/utils/lpdHelper";
import { v4 as uuid } from 'uuid';
import WARNING_LOGO from "src/icons/warning-5-256.ico"

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

const missileToOwnshipDetectedMessageLow = () => {
    return {
        sections: [],
        possibleWidgets: [lpdHelper.generateWidget(
            uuid(),
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
                        50,
                        50,
                        0,
                        0,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        false,
                        false,
                        // Blinking icon?
                    ),
                    WARNING_LOGO,
                    "warning"
                ),
                lpdHelper.generateTextElement(
                    lpdHelper.generateBaseElement(
                        uuid(),
                        'visual',
                        50,
                        100,
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
                            background: "black",
                            color: "#02d118"
                        }
                    ),
                    "Missile to ownship detected! T-30 till impact"
                )
            ],
        )],
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