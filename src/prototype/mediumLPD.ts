import type { Message } from "src/types/schema-types";
import lpdHelper from "src/utils/lpdHelper";

// Functions to create widgets, elements, and sections for each message type
const requestApprovalToAttackMessageMedium = () => {
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

const acaFuelLowMessageMedium = () => {
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

const missileToOwnshipDetectedMessageMedium = () => {
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

const acaDefectMessageMedium = () => {
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

const acaHeadingToBaseMessageMedium = () => {
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