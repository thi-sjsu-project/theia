import { removeWidget } from 'src/redux/slices/minimapSlice';
import type { AppDispatch } from 'src/redux/store';
import type { Message } from 'src/types/schema-types';
import reactToMessage from 'src/prototype/reactToMessage';
import type { Widget } from 'src/types/widget';

type StressChangeHandlerProps = {
  // define expected input here and it's type (number, string, etc.)
  stressLevel: number;
  dispatch: AppDispatch;
  allWidgets: Widget[];
  allMessages: Message[];
  allWidgetsInNewStressLPD: Widget[];
};

/**
 * @description ???
 * @param ???
 * @returns ???
 */
const stressChangeHandler = ({
  stressLevel,
  dispatch,
  allWidgets,
  allMessages,
  allWidgetsInNewStressLPD,
}: StressChangeHandlerProps) => {
  //find the widgets we can delete via tags

  allWidgets.forEach(function (widget, widgetIndex) {
    //go through every widget in state
    let widgetIsInNewStressLPD = false;
    allWidgetsInNewStressLPD.forEach((widgetInStress) => {
      //go through every widget in new stress LPD
      if (!widgetIsInNewStressLPD) {
        let hasAllTags = true;
        widgetInStress.tags!.forEach((stressTag) => {
          //go through every tag in the current widget in stress LPD
          if (!widget.tags!.includes(stressTag)) {
            //if a tag from the new stress widget is not in the current widget, then it is not the same
            hasAllTags = false;
          }
        });

        if (hasAllTags) {
          //if the widget has all the tags that the new stress widget does, then this widget exists in the new stress LPD
          widgetIsInNewStressLPD = true; //so lets say that it exists
        }
      }
    });

    //if the widget does not exist in new stress LPD, then we can delete it
    if (!widgetIsInNewStressLPD) {
      dispatch(removeWidget(widget.id));
    }
  });

  //rerun through all messages that are not handled so that widgets that should be displayed for current stress level get displayed
  allMessages.forEach(function (message, messageIndex) {
    if (!message.fulfilled) {
      reactToMessage({
        dispatch: dispatch,
        currentMessage: message,
        stressLevel,
      });
    }
  });

  //messages need to have completed

  return {};
};

export default stressChangeHandler;
