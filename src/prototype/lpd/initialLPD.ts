import initialSections from 'src/prototype/utils/initialSections';
import {
  drones,
  ownship,
  initialWidgets,
} from 'src/prototype/utils/initialWidgets';

const initialLPD = {
  sections: [...initialSections],
  widgets: { ...initialWidgets },
};

export { drones, ownship };
export default initialLPD;
