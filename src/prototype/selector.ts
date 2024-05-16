import type { Message } from 'src/types/schema-types';
import lowLPD from 'src/prototype/lpd/stress/lowLPD';
import mediumLPD from 'src/prototype/lpd/stress/mediumLPD';
import highLPD from 'src/prototype/lpd/stress/highLPD';
import initialLPD from 'src/prototype/lpd/initialLPD';
import type { Widget } from 'src/types/widget';
import type { WidgetCluster } from 'src/types/support-types';

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
    
    let allWidgets: Widget[] = [];
    //get all of the widgets in the inital LPD
    for (const [key, widget] of Object.entries(initialLPD.widgets)) {
        allWidgets.push(widget);
    }

    stressLevel = Math.floor(stressLevel! * 3); //get stress level as int
    const tempMessage = <Message>({ //dummy message to put into LPD function
      priority: -1,
    })
    
    //return the intial LPD widgets with the widgets returned from the LPD function(all widgets in this stress level)
    return allWidgets.concat(stressLevelLPDFunctions[stressLevel](tempMessage));
  } else {
    // Transform range of stress levels from 0-1 to 0-2 only returning integers
    stressLevel = Math.floor(stressLevel! * 3);
    return stressLevelLPDFunctions[stressLevel](message!);
  }
};

export default selector;
