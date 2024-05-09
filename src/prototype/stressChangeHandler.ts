import type { Widget, WidgetMap } from 'src/types/widget';
import type { Section, LinkedSectionWidget } from 'src/types/support-types';
import { AppDispatch } from 'src/redux/store';
import { deleteElementFromWidget, getAllElements, toggleInSwitchState } from 'src/redux/slices/minimapSlice';
import { ElementInGaze } from 'src/redux/slices/gazeSlice';
import { BaseElement } from 'src/types/element';

type StressChangeHandlerProps = {
  // define expected input here and it's type (number, string, etc.)
  dispatch: AppDispatch;
  elemsInGaze: ElementInGaze[];
  allElements: BaseElement[];
  allMessages: Message[]; 
};

/**
 * @description ???
 * @param ???
 * @returns ???
 */
const stressChangeHandler = ({
  dispatch,
  elemsInGaze,
  allElements,
  allMessages,
}: StressChangeHandlerProps) => {
  dispatch(toggleInSwitchState());

  //get full elements that are currently in gaze
  let elementsToShiftGaze: BaseElement[] = [];
  let elementsToShiftGazeIds: string[] = [];
  elemsInGaze.forEach(function(elementInGaze, elementInGazeIndex){
    allElements.forEach(function(element, elementIndex){
      if(element.id == elementInGaze.id){
        elementsToShiftGaze.push(element);
        elementsToShiftGazeIds.push(element.id)
      }
    });
  });

  
  
  allElements.forEach(function(element, elementIndex){
    if(!elementsToShiftGazeIds.includes(element.id)){ //this is not in gaze, delete it
      dispatch(deleteElementFromWidget(element.widgetId, element.id))
    }
  });
  elementsToShiftGaze.forEach(function(elementToShift, elementToShiftIndex){
    dispatch(makeWidgetSwitchFriendly(elementToShift.widgetId))
  });



  all.forEach(function(elementToShift, elementToShiftIndex){




  dispatch(toggleInSwitchState());
  return {
    
  };
};

export default stressChangeHandler;
