import type { Message } from 'src/types/schema-types';
import selector from './selector';
import assimilator from './assimilator';
import store from 'src/redux/store';
import type { AppDispatch } from 'src/redux/store';
import {
  addElementToWidget,
  addWidget,
  addWidgetToSection,
} from 'src/redux/slices/minimapSlice';
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

  const { possibleClusters:possibleWidgetClusters } = selector({
    message: currentMessage,
    stressLevel,
  });

  let resolved = false;
  while(!resolved){ //repeat ntil choosing a cluster has resolved
    //console.log('running through assimilator...');
    const { widgetClusterToDeploy,  index} = assimilator({
      // find if there is room for us to put the widget down (returns null if there is not room)
      possibleWidgetClusters: possibleWidgetClusters,
      sections,
      widgets,
      message: currentMessage,
    });

    //check restrainer with all new widgets
    //if cluster is bad then go back to assim
    //else run through individual widgets in cluster and do their thing

    //get all widgets that are new widgets in candidate cluster
    const newWidgets: Widget[] = [];
    widgetClusterToDeploy.widgets.forEach((widget, widgetIndex) => {
      if(widgetClusterToDeploy.actions![widgetIndex] === 'newWidget'){ //if this widget is a new widget, add it to list
        newWidgets.push(widget)
      }
    });

    if(index != -1 && restrainer({widgetsToDeploy: newWidgets})){ //if the assim chose a cluster and the restrainer is okoay with the new widgets
      resolved = true;

      widgetClusterToDeploy.widgets.forEach((widget, widgetIndex) => {
        const widgetToDeploy = widget;
        const sectionID = widgetClusterToDeploy.sectionIds![widgetIndex]
        const action = widgetClusterToDeploy.actions![widgetIndex]
    
        if (action !== 'newWidget') {
          //we should do something other than
          switch (action) {
            case 'updateWidget':
              console.log('widget already exists, updating');
              // only have one widget in possibleWidgets right now, this is why this works
              // furthermore, only have one element in the widget
              // so we can just do possibleWidgets[0]...
              // eventually, maybe assimilator returns the widget that needs to be updated
              // assimilator should also say if to add a new element or remove one, etc. -- JAGJIT
              dispatch(
                addElementToWidget(
                  widgetToDeploy.id,
                  widgetToDeploy.elements[0], //<- This should not be able to happen, why are we choosing one element if multiple need to be placed -Tom
                ),
              );
              break;
            case 'none':
              console.log('proposed widgets could not be placed');
              break;
          }
        } else if (widgetToDeploy) {


            // restrainer deems that the widget CAN be deployed
            
            // dispatch action to add new widget
            dispatch(addWidget(widgetToDeploy));
            dispatch(addWidgetToSection(sectionID));
        }
      });
    } else { //the restrainer said no, so delete the chosen cluster and try again
      possibleWidgetClusters.splice(index, 1);
    }
  }
};

export default reactToMessage;
