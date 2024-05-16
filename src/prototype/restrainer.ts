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
  widgetsToDeploy: Widget[];
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
function totalVisualComplexity(widgets : Widget[]) {
  
  // Calculating the current visual complexity of the screen
  const currentScreenComplexity = () => Object.values(store.getState().minimap.widgets).reduce( (acc, widget) => acc + widget.elements.length, 0);
  
  // Calculating the visual complexity of the widgetsToDeploy
  const newWidgetsVisualComplexity = (newWidgets : Widget[]) => Object.values(newWidgets).reduce( (acc, widget) => acc + widget.elements.length, 0)

   //map the number of elements into the visualMeasure range based on the max number of elements we want to allow on our screens
  const maxNumElements = 100;
  const valueInRange = Math.min(((currentScreenComplexity() + newWidgetsVisualComplexity(widgets))/maxNumElements)*visualMeasure.range.max, visualMeasure.range.max)
  return valueInRange;
}



/**
 * @description restrains the cm if placing the widgetToDeploy will cause to exceed our maximum threshold
 * @param the widget To Deploy
 * @returns if widgetToDeploy can be placed
*/
const restrainer = ({ widgetsToDeploy }: RestrainerProps) => {
  // Calculating if adding @param widget will remain within bounds
  const visualComplexityAfterAddingWidgets = totalVisualComplexity(widgetsToDeploy);
  const canBePlaced = visualMeasure.boundary.min <= visualComplexityAfterAddingWidgets && visualComplexityAfterAddingWidgets <= visualMeasure.boundary.max;

  if (!canBePlaced) 
    console.warn(`This widget could not be deployed. Adding the widget will result in visual complexity of ${visualComplexityAfterAddingWidgets}. Will go out of acceptable bounds ${visualMeasure.boundary.min} - ${visualMeasure.boundary.max}.`)

  return canBePlaced;
};

export default restrainer;
