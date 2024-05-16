import type { Message } from 'src/types/schema-types';
import lowLPD from 'src/prototype/lpd/stress/lowLPD';
import mediumLPD from 'src/prototype/lpd/stress/mediumLPD';
import highLPD from 'src/prototype/lpd/stress/highLPD';
import initialLPD from 'src/prototype/lpd/initialLPD';
import type { Widget } from 'src/types/widget';

const stressLevelLPDFunctions = [lowLPD, mediumLPD, highLPD];

type SelectorProps = {
  message?: Message;
  stressLevel?: number;
};

/**
 * @description ???
 * @param ???
 * @returns ???
 */
const selector = ({ message, stressLevel }: SelectorProps = {}) => {
  // Call the LPD function that corresponds to the stress level from the message
  if (!message && !stressLevel) {
    // If no message and no stress provided, return the initial LPD
    return initialLPD;
  } else if(stressLevel && !message) { //return all widgets in current stressLevel
    let widgetsInInitial: Widget[] = [];
    for (const [key, widget] of Object.entries(initialLPD.widgets)) {
        widgetsInInitial.push(widget);
    }

    stressLevel = Math.floor(stressLevel! * 3); //get stress level as int
    const tempMessage = <Message>({ //dummy message to put into function
      priority: -1,
    })
    return widgetsInInitial.concat(stressLevelLPDFunctions[stressLevel](tempMessage));
  } else {
    // Transform range of stress levels from 0-1 to 0-2 only returning integers
    stressLevel = Math.floor(stressLevel! * 3);
    console.log('Stress level: ' + stressLevel);
    return stressLevelLPDFunctions[stressLevel](message!);
  }
};

export default selector;
