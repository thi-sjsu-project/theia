import store from 'src/redux/store';
import type { Modality } from 'src/types/modalities';
import { type Widget, type WidgetMap } from 'src/types/widget';
import { modalityMeasures } from 'src/utils/restrainerConst';

type RestrainerProps = {
  // define expected input here and it's type (number, string, etc.)
  // visualComplexity: number;
  // audioComplexity: number;
  widgetToDeploy: Widget;
  // add more as needed
};

// TODO: move these to types folder
type ModalityMeasureRange = {
  min: number;
  max: number;
};

type ModalityMeasureBoundary = {
  min: number;
  max: number;
};

export type ModalityMeasure = {
  // for now it only takes into account how many visual and audio modalities are used
  /**
   * or use array instead of number and use objects with attributes such as volume, frequency
   * amount of audios playing at the same time for example can be seen by the amout of objects in the list
   */
  type: Modality;
  measure: number;
  range: ModalityMeasureRange;
  boundary: ModalityMeasureBoundary;
};

// Simulated restrainer visual complexity
const screenComplexity = (widgets : WidgetMap) => {
  return Object.values(widgets).reduce( (acc, widget) => acc + widget.elements.length, 0);
}

// **** SET MAX BOUND ****
const maxBound = {
  visual: 100,
};

/**
 * @description restrains the cm if placing the widgetToDeploy will cause to exceed our maximum threshold
 * @param the widget To Deploy
 * @returns if widgetToDeploy can be placed
 */
const restrainer = ({ widgetToDeploy }: RestrainerProps) => {
  const visualCurrentComplexity = screenComplexity(store.getState().minimap.widgets);
  const widgetComplexity = widgetToDeploy?.elements.length;
  
  const canBePlaced = maxBound.visual - visualCurrentComplexity >= widgetComplexity; 
  
  if (!canBePlaced) 
    console.warn(`This widget could not be deployed at visual complexity ${widgetComplexity}. The visual complexity (currently at ${visualCurrentComplexity}) will surpass the threshold ${maxBound.visual}.`)

  return canBePlaced;

  // currently visual only
  // if (
  //   modalityMeasures.visual.boundary.max - modalityMeasures.visual.measure <=
  //   visualComplexity
  // ) {
  //   console.warn('widget could not be added; will surpass boundary');
  //   return false;
  // }

  // modalityMeasures.visual.measure += visualComplexity;
  // // console.log(modalityMeasures);
  // return true;
};

export default restrainer;
