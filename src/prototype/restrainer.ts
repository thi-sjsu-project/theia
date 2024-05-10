import store from 'src/redux/store';
import type { Modality } from 'src/types/modalities';
import { type Widget } from 'src/types/widget';
import { type ModalityMeasure } from 'src/types/restrain';




// for now it only takes into account how many visual and audio modalities are used
/**
 * Note:
 * or use array instead of number and use objects with attributes such as volume, frequency
 * amount of audios playing at the same time for example can be seen by the amout of objects in the list
 */




type RestrainerProps = {
  // define expected input here and it's type (number, string, etc.)
  widgetToDeploy: Widget;
  // add more as needed
};

// **** Set modality boundaries and ranges ****
const visualMeasure : ModalityMeasure = {
  type: "visual",
  // measure: 0,
  range: {
    min: 0,
    max: 100,
  },
  boundary: {
    min: 0,
    max: 80,
  },
}

// **** Simulated restrainer visual complexity ****
function totalVisualComplexity(widget : Widget) {
  // Calculating the current visual complexity of the screen
  const currentScreenComplexity = () => Object.values(store.getState().minimap.widgets).reduce( (acc, widget) => acc + widget.elements.length, 0);
  
  // Calculating the visual complexity of the widgetToDeploy
  const widgetVisualComplexity = (widget : Widget) => widget?.elements.length;

  return Math.min(visualMeasure.range.max, Math.max(visualMeasure.range.min, currentScreenComplexity() + widgetVisualComplexity(widget))); // keep the complexity within range bounds
}



/**
 * @description restrains the cm if placing the widgetToDeploy will cause to exceed our maximum threshold
 * @param the widget To Deploy
 * @returns if widgetToDeploy can be placed
*/
const restrainer = ({ widgetToDeploy }: RestrainerProps) => {
  // Calculating if adding @param widget will remain within bounds
  const visualComplexityAfterAddingWidget = totalVisualComplexity(widgetToDeploy);
  const canBePlaced = visualMeasure.boundary.min <= visualComplexityAfterAddingWidget && visualComplexityAfterAddingWidget <= visualMeasure.boundary.max;

  if (!canBePlaced) 
    console.warn(`This widget could not be deployed. Adding the widget will result in visual complexity of ${visualComplexityAfterAddingWidget}. Will go out of acceptable bounds ${visualMeasure.boundary.min} - ${visualMeasure.boundary.max}.`)

  return canBePlaced;
};

export default restrainer;
