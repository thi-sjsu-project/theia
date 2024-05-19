import type { AppDispatch } from 'src/redux/store';
import {
  removeWidget,
  deleteElementFromWidget,
  updateElementExpiration,
  escalateElement,
  deescalateElement,
} from 'src/redux/slices/minimapSlice';
import store from 'src/redux/store';
import type { ElementInGaze, GazeAndKey } from 'src/redux/slices/gazeSlice';
import type { BaseElement } from 'src/types/element';

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
  // THE 100 MS DIFFERENCE COMPARISON NOT WORKING -- SO COMMENTED OUT FOR NOW - Jagjit
  // timeSomeMsAgo.setMilliseconds(
  //   timeSomeMsAgo.getMilliseconds() - 100, //<- 100 should be in constants file, but just testing now
  // ); //set timeSomeMsAgo to the time it was 100 ms ago
  elementsInGaze.forEach(function (
    elementInGaze: ElementInGaze,
    elementInGazeIndex: number,
  ) {
    console.log('element in gaze');
    if (timeSomeMsAgo.toISOString() >= elementInGaze.timeEnteredGaze) {
      //has been in gaze for at least 100 ms
      console.log(
        'interacted with element ' + elementInGaze.id + ' using gaze',
      );
      dispatch(
        updateElementExpiration(elementInGaze.widgetId, elementInGaze.id),
      ); //update the time until expiration
    }
  });

  //detect interactions via key press
  gazesAndKeys.forEach(function (
    gazeAndKey: GazeAndKey,
    gazeAndKeyIndex: number,
  ) {
    gazeAndKey.elemsInGaze.forEach(
      function (elementInGaze, elementInGazeIndex) {
        dispatch(
          updateElementExpiration(elementInGaze.widgetId, elementInGaze.id),
        ); //update the time until expiration
        console.log(
          'interacted with element ' +
            elementInGaze.id +
            ' using ' +
            gazeAndKey.keyPress,
        );
      },
    );
  });

  Object.keys(widgets).forEach((widgetId) => {
    //update widgets and elements that haven't been interacted with
    const widget = widgets[widgetId];

    widget.elements.forEach((element: BaseElement, elementIndex: number) => {
      //go through each element
      if (element.expiration && !element.interacted) {
        //if it has an expiration and has not been interacted with
        const time = new Date().toISOString();

        if (element.expiration <= time) {
          switch (element.onExpiration) {
            case 'delete':
              console.log('element ' + element.id + ' expired! deleting...');
              if (widget.elements.length === 1) {
                //if this is the last element, delete the whole widget
                dispatch(removeWidget(widget.id));
              } else {
                dispatch(deleteElementFromWidget(widgetId, element.id)); //delete the widget
              }
              break;
            case 'escalate':
              console.log('element ' + element.id + ' expired! escalating...');
              dispatch(escalateElement(widget.id, element.id));
              break;
            case 'deescalate':
              console.log('element ' + element.id + ' expired! descalating...');
              dispatch(deescalateElement(widget.id, element.id));
              break;
          }
        }
      }
    });
  });
};

export default monitor;
