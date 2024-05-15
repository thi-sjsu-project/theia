import initialSections from 'src/prototype/utils/initialSections';
import initialWidgets from 'src/prototype/utils/initialWidgets';
import initialWarnings from 'src/prototype/utils/initialWarnings';
import {
  drones,
  ownship,
  initialShips,
} from 'src/prototype/utils/initialShips';

const initialLPD = {
  sections: [...initialSections],
  widgets: { ...initialShips, ...initialWarnings, ...initialWidgets },
};

export { drones, ownship };
export default initialLPD;
