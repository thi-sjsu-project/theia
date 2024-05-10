import store from 'src/redux/store';
import type { Modality } from 'src/types/modalities';
import { type Widget } from 'src/types/widget';
import { type ModalityMeasureRange, type ModalityMeasureBoundary } from 'src/types/restrain';

type RestrainerProps = {
  // define expected input here and it's type (number, string, etc.)
  widgetToDeploy: Widget;
  // add more as needed
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

// **** Simulated restrainer visual complexity ****
function totalVisualComplexity(widget : Widget) {
  // Calculating the current visual complexity of the screen
  const currentScreenComplexity = () => Object.values(store.getState().minimap.widgets).reduce( (acc, widget) => acc + widget.elements.length, 0);
  
  // Calculating the visual complexity of the widgetToDeploy
  const widgetVisualComplexity = (widget : Widget) => widget?.elements.length;

  return Math.min(visualRange.max, Math.max(visualRange.min, currentScreenComplexity() + widgetVisualComplexity(widget))); // keep the complexity within range bounds
}


// **** Set modality boundaries and ranges ****
const visualRange : ModalityMeasureRange = {
  min: 0,
  max: 100
};

const visualBound : ModalityMeasureBoundary = {
  min: 0,
  max: 80,
};

/**
 * @description restrains the cm if placing the widgetToDeploy will cause to exceed our maximum threshold
 * @param the widget To Deploy
 * @returns if widgetToDeploy can be placed
*/
const restrainer = ({ widgetToDeploy }: RestrainerProps) => {
  // Calculating if adding @param widget will remain within bounds
  const visualComplexityAfterAddingWidget = totalVisualComplexity(widgetToDeploy);
  const canBePlaced = visualBound.min <= visualComplexityAfterAddingWidget && visualComplexityAfterAddingWidget <= visualBound.max;

  if (!canBePlaced) 
    console.warn(`This widget could not be deployed. Adding the widget will result in visual complexity of ${visualComplexityAfterAddingWidget}. Will go out of acceptable bounds ${visualBound.min} - ${visualBound.max}.`)

  return canBePlaced;
};

export default restrainer;
