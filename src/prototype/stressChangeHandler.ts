import { removeWidget } from "src/redux/slices/minimapSlice";
import type { AppDispatch } from "src/redux/store";
import type { Message } from "src/types/schema-types";
import reactToMessage from "./reactToMessage";



type StressChangeHandlerProps = {
  // define expected input here and it's type (number, string, etc.)
  stressLevel: number;
  dispatch: AppDispatch;
  allWidgetIds: string[];
  allMessages: Message[];
  allWidgetsInNewStressLPDIds: string[];
};

/**
 * @description ???
 * @param ???
 * @returns ???
 */
const stressChangeHandler = ({
  stressLevel,
  dispatch,
  allWidgetIds,
  allMessages,
  allWidgetsInNewStressLPDIds,
}: StressChangeHandlerProps) => {
  allWidgetIds.forEach(function (widgetId, widgetIdIndex) {
    if (!allWidgetsInNewStressLPDIds.includes(widgetId)) {
      dispatch(removeWidget(widgetId));
    }
  });

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