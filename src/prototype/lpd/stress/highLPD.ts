import type { Message } from "src/types/schema-types";
import lpdHelper from "src/utils/lpdHelper";

// Functions to create widgets, elements, and sections for each message type
const requestApprovalToAttackMessageHigh = () => {
    return {
        sections: [],
        widgets: [lpdHelper.generateWidget(
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
        widgets: [lpdHelper.generateWidget(
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

const missileToOwnshipDetectedMessageHigh = () => {
    return {
        sections: [],
        widgets: [lpdHelper.generateWidget(
            'highWarning',
            'highWarning',
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

const acaDefectMessageHigh = () => {
    return {
        sections: [],
        widgets: [lpdHelper.generateWidget(
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
        widgets: [lpdHelper.generateWidget(
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