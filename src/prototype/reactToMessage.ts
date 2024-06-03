import type { Message } from 'src/types/schema-types';
import selector from './selector';
import assimilator from './assimilator';
import store from 'src/redux/store';
import type { AppDispatch } from 'src/redux/store';
import {
  addElementsToWidget,
  addHandledMessageToWidget,
  addWidget,
  addWidgetToSection,
} from 'src/redux/slices/cmSlice';
import restrainer from './restrainer';
import type { Widget } from 'src/types/widget';

type ReactToMessageProps = {
  // define expected input here and it's type (number, string, etc.)
  dispatch: AppDispatch;
  currentMessage: Message;
  stressLevel: number;
};

/**
 * @description ???
 * @param ???
 * @returns ???
 */
const reactToMessage = ({
  dispatch,
  currentMessage,
  stressLevel,
}: ReactToMessageProps) => {
  const sections = store.getState().minimap.sections;
  const widgets = store.getState().minimap.widgets;

  const { possibleClusters: possibleWidgetClusters } = selector({
    message: currentMessage,
    stressLevel,
  });

  let resolved = false;
  while (!resolved) {
    //repeat ntil choosing a cluster has resolved
    //console.log('running through assimilator...');
    const { widgetClusterToDeploy, index } = assimilator({
      // find if there is room for us to put the widget down (returns null if there is not room)
      possibleWidgetClusters: possibleWidgetClusters,
      sections,
      widgets,
      message: currentMessage,
    });

    if (index === -1) resolved = true;

    //check restrainer with all new widgets
    //if cluster is bad then go back to assim
    //else run through individual widgets in cluster and do their thing

    //get all widgets that are new widgets in candidate cluster
    const newWidgets: Widget[] = [];
    widgetClusterToDeploy.widgets.forEach((widget, widgetIndex) => {
      if (widgetClusterToDeploy.actions![widgetIndex] === 'newWidget') {
        //if this widget is a new widget, add it to list
        newWidgets.push(widget);
      }
    });

    if (index !== -1 && restrainer({ widgetsToDeploy: newWidgets })) {
      //if the assim chose a cluster and the restrainer is okoay with the new widgets
      resolved = true;

      widgetClusterToDeploy.widgets.forEach((widget, widgetIndex) => {
        const widgetToDeploy = widget;
        const sectionID = widgetClusterToDeploy.sectionIds![widgetIndex];
        const action = widgetClusterToDeploy.actions![widgetIndex];

        if (action !== 'newWidget') {
          //we should do something other than
          switch (action) {
            case 'updateWidget':
              dispatch(
                addElementsToWidget(widgetToDeploy.id, widgetToDeploy.elements), // add new elements to the widget
              );
              dispatch(
                addHandledMessageToWidget(widgetToDeploy.id, currentMessage.id), // add the message to the widget's handledMessages array
              );
              break;
            case 'none':
              console.error('proposed widgets could not be placed');
              break;
          }
        } else if (widgetToDeploy) {
          // restrainer deems that the widget CAN be deployed

          // dispatch action to add new widget
          dispatch(addWidget(widgetToDeploy));
          dispatch(addWidgetToSection(sectionID));
        }
      });
    } else {
      //the restrainer said no, so delete the chosen cluster and try again
      possibleWidgetClusters.splice(index, 1);
    }
  }
};

export default reactToMessage;
