import type { SimToCmMessage } from "submodules/message-schemas/schema-types";
import lowLPD from "./lowLPD";
import mediumLPD from "./mediumLPD";
import highLPD from "./highLPD";
import initialLPD from "./initialLPD";

const stressLevelLPDFunctions: any = {
  "low": lowLPD,
  "medium": mediumLPD,
  "high": highLPD,
}

const generateLPD = (message?: SimToCmMessage) => {
  // Call the LPD function that corresponds to the stress level from the message
  if (message && message.stressLevel) {
    return stressLevelLPDFunctions[message.stressLevel](message);
  } else {
    // If no message is provided, return the initial LPD
    return initialLPD;
  }
}

export default generateLPD;