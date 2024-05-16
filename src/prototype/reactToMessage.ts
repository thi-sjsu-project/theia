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

  const { possibleWidgets } = selector({
    message: currentMessage,
    stressLevel,
  });

  // possibleWidgets[0].id = uuid();

  //console.log('running through assimilator...');
  const { widgetToDeploy, sectionID, action, index} = assimilator({
    // find if there is room for us to put the widget down (returns null if there is not room)
    possibleWidgets: possibleWidgets,
    sections,
    widgets,
    message: currentMessage,
  });

  //console.log('widgetToDeploy ' + widgetToDeploy);
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
            possibleWidgets[0].id,
            possibleWidgets[0].elements[0],
          ),
        );
        break;
      case 'none':
        console.log('proposed widgets could not be placed');
        break;
    }
  } else if (widgetToDeploy) {
    if (restrainer({ widgetToDeploy : widgetToDeploy })) {
      // restrainer deems that the widget CAN be deployed
      
      // dispatch action to add new widget
      dispatch(addWidget(widgetToDeploy));
      dispatch(addWidgetToSection(sectionID));
    }
  }
};

export default reactToMessage;
