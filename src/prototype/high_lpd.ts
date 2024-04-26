import type { Message } from "src/types/schema-types";
import { createWidget, createElement, createSection } from "src/utils/lpdHelper";

const highLPD = (message: Message) => {
  const lpd: any = {};
  switch (message.kind) {
    case 'RequestApprovalToAttack':
      lpd.widgets = [createWidget(
        'request',
        'request',
        100,
        100,
        200,
        200,
        false,
        true,
        3,
        [], // create elements here
      )];
      lpd.sections = [];
      break;
    case 'AcaFuelLow':
      lpd.sections = [];
      break;
    case 'MissileToOwnshipDetected':
      lpd.sections = [];
      lpd.widgets = [createWidget(
        'highWarning',
        'highWarning',
        100,
        100,
        200,
        200,
        false,
        true,
        1,
        [], // create elements here
      )];
      break;
    case 'AcaDefect':
      lpd.sections = [];
      // don't display anything
      break;
    case 'AcaHeadingToBase':
      lpd.sections = [];
      // don't display anything
      break;
    default:
      break;
  }
  return lpd;
};

export default highLPD;