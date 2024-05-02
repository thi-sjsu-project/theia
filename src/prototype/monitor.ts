import type { AppDispatch } from 'src/redux/store';
import {
  removeWidget,
  deleteElementFromWidget,
  updateElementExpiration,
} from 'src/redux/slices/minimapSlice';
import store from 'src/redux/store';

type MonitorProps = {
  // define expected input here and it's type (number, string, etc.)
  dispatch: AppDispatch;
};

/**
 * @description ???
 * @param ???
 * @returns ???
 */
const monitor = ({ dispatch }: MonitorProps) => {
  //human visual recognition is about 100 ms: https://www.cell.com/neuron/fulltext/S0896-6273(09)00171-8?_returnURL=https%3A%2F%2Flinkinghub.elsevier.com%2Fretrieve%2Fpii%2FS0896627309001718%3Fshowall%3Dtrue#secd20967130e327
  const widgets = store.getState().minimap.widgets;
  const elementsInGaze = store.getState().gaze.elementsInGaze;
  const gazesAndKeys = store.getState().gaze.gazesAndKeys;


  /*
  *
  *detect and handle interactions with elements
  *
  */

  //detect interactions via gaze
  const timeSomeMsAgo = new Date();
  timeSomeMsAgo.setMilliseconds(
    timeSomeMsAgo.getMilliseconds()-100, //<- 100 should be in constants file, but just testing now
  );//set timeSomeMsAgo to the time it was 100 ms ago
  elementsInGaze.forEach(function(elementInGaze, elementInGazeIndex){
    if(timeSomeMsAgo.toISOString() <= elementInGaze.timeEnteredGaze){ //has been in gaze for at least 100 ms
      dispatch(updateElementExpiration(elementInGaze.widgetId, elementInGaze.id)); //update the time until expiration
      console.log('interacted with element '+elementInGaze.id+' using gaze');
    }
  });

  //detect interactions via key press
  gazesAndKeys.forEach(function(gazeAndKey, gazeAndKeyIndex){
    gazeAndKey.elemsInGaze.forEach(function(elementInGaze, elementInGazeIndex){
      dispatch(updateElementExpiration(elementInGaze.widgetId, elementInGaze.id)); //update the time until expiration
      console.log('interacted with element '+elementInGaze.id+' using '+gazeAndKey.keyPress);
    });
  });




  Object.keys(widgets).forEach((widgetId) => { //update widgets and elements that haven't been interacted with
    const widget = widgets[widgetId];

    widget.elements.forEach((element, elementIndex) => {
      //go through each element
      if (element.expiration && !element.interacted) {//if it has an expiration and has not been interacted with
        const time = new Date().toISOString();

        if (element.expiration <= time) {

          switch(element.onExpiration){
            case 'delete':
              console.log('element ' + element.id + ' expired! deleting...');
              if (widget.elements.length === 1) { //if this is the last element, delete the whole widget
                dispatch(removeWidget(widget.id));
              } else {
                dispatch(deleteElementFromWidget(widgetId, element.id)); //delete the widget
              }
              break;
          }
        }
      }
    });
  });
};

export default monitor;
