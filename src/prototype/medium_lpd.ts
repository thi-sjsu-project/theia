import type { Message } from "src/types/schema-types";
import { createWidget, createElement, createSection } from "src/utils/lpdHelper";


const mediumLPD = (message: Message) => {
    const lpd: any = {}
    switch (message.kind) {
        case 'RequestApprovalToAttack':
            //create stuff
            break;
        case 'AcaFuelLow':
            //create stuff
            break;
        case 'MissileToOwnshipDetected':
            //create stuff
            break;
        case 'AcaDefect':
            //create stuff
            break;
        case 'AcaHeadingToBase':
            //create stuff
            break;
        default:
            break;
    }
    return lpd;
};

export default mediumLPD;