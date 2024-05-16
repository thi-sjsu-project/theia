import { ElementInGaze } from "src/redux/slices/gazeSlice";
import { removeWidget } from "src/redux/slices/minimapSlice";
import { AppDispatch } from "src/redux/store";
import { BaseElement } from "src/types/element";
import { Message } from "src/types/schema-types";
import { Widget } from "src/types/widget";
import reactToMessage from "./reactToMessage";



type StressChangeHandlerProps = {
    // define expected input here and it's type (number, string, etc.)
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
    dispatch,
    allWidgetIds,
    allMessages,
    allWidgetsInNewStressLPDIds,
 }: StressChangeHandlerProps) => {
    allWidgetIds.forEach(function(widgetId, widgetIdIndex){
        if(!allWidgetsInNewStressLPDIds.includes(widgetId)){
            dispatch(removeWidget(widgetId))
        }
    });

    allMessages.forEach(function(message, messageIndex){
        if(!message.fulfilled){
            reactToMessage({dispatch:dispatch, currentMessage:message});
        }
    });

      //messages need to have completed

    return {

    };
  }

  export default stressChangeHandler;