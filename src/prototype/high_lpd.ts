import type { Message } from "src/types/schema-types";
import { createWidget, createElement, createSection } from "src/utils/lpdHelper";

const highLPD = (message: Message) => {
  const lpd: any = {};
  switch (message.kind) {
    case 'RequestApprovalToAttack':
      lpd.widgets = [createWidget];
      lpd.sections = [];
      break;
    case 'AcaFuelLow':
      lpd.widgets = [
        createWidget(
          'request',
          'request',
          0,
          0,
          140,
          80,
          false,
          true,
          1,
          element,
          {
            backgroundColor: 'red',
            position: 'absolute',
            opacity: 0.5,
            border: 'solid',
            zIndex: 100,
          },
        ),
      ];
      break;
    case 'MissileToOwnshipDetected':
      //create stuff
      break;
    case 'AcaDefect':
      // don't display anything
      break;
    case 'AcaHeadingToBase':
      // don't display anything
      break;
    default:
      break;
  }
  return lpd;
};

export default highLPD;