import { useEffect } from 'react';
// ~~~~~~~ Redux ~~~~~~~
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import {
  type InitialMinimapState,
  addElementToWidget,
  addWidget,
  addWidgetToSection,
  getSections,
  getWidgets,
  initializeState,
} from 'src/redux/slices/minimapSlice';
import {
  addKeyDown,
  getElementsInGaze,
  getGazesAndKeys,
  removeKeyDown,
  setElementsInGaze,
  type ElementInGaze,
} from 'src/redux/slices/gazeSlice';
// ~~~~~~~ Cusdom Hooks ~~~~~~~
import { useKeyDown } from 'src/hooks/useKeyDown';
import { useMousePosition } from 'src/hooks/useMousePosition';
import { useKeyUp } from 'src/hooks/useKeyUp';
import { useMouseButtonDown } from 'src/hooks/useMouseButtonDown';
import { useMouseButtonUp } from 'src/hooks/useMouseButtonUp';
import useWorldSim from 'src/hooks/useWorldSim';
import { findElementsInGaze } from 'src/hooks/findElementsInGaze';
// ~~~~~~~ Prototype ~~~~~~~
import assimilator from 'src/prototype/assimilator';
import selector from 'src/prototype/selector';
// ~~~~~~~ Constants ~~~~~~~
import { GAZE_RADIUS } from 'src/utils/constants';
import { ownship, drones, initialShips } from 'src/utils/initialShips';
import { initialSections } from 'src/utils/initialSections';
import Home from 'src/components/Home';
import monitor from 'src/prototype/monitor';

const CIRCLE_PERCENTAGE_THRESH = 0.1;
const ELEMENT_PERCENTAGE_THRESH = 0.1;

const Prototype = () => {
  // ~~~~~ Custom Hooks ~~~~~~
  const { messages, stressLevel } = useWorldSim();

  // ~~~~~ Selectors ~~~~~~
  const sections = useAppSelector(getSections);
  const widgets = useAppSelector(getWidgets);
  const gazesAndKeys = useAppSelector(getGazesAndKeys);
  const elemsInGaze: ElementInGaze[] = useAppSelector(getElementsInGaze);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // Intiailize minimap state
    const initialState: InitialMinimapState = {
      visualComplexity: 0,
      audioComplexity: 0,
      ownship,
      drones,
      widgets: { ...initialShips },
      messages: [],
      sections: [...initialSections],
    };

    dispatch(initializeState(initialState));
  }, [dispatch]);

    //call the monitor
    useEffect(() => {
      const intervalID = setInterval(() =>  {
          monitor({dispatch})
      }, 100);
  
      return () => clearInterval(intervalID);
    }, []);

  // run whenever messages array changes
  useEffect(() => {
    if (messages.length === 0) return;

    //console.log('passing message to the selector');
    // latest message in the last one in the list
    const currentMessage = messages[messages.length - 1];
    //console.log('currentMessage:', currentMessage);

    const { message, possibleWidgets } = selector({
      message: currentMessage,
    });

    // possibleWidgets[0].id = uuid();

    //console.log('running through assimilator...');
    const { widgetToDeploy, sectionID, action } = assimilator({
      // find if there is room for us to put the widget down (returns null if there is not room)
      possibleWidgets: possibleWidgets,
      sections,
      widgets,
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
      //console.log('widget deployed:', widgetToDeploy);
      //console.log('widgets that are now deployed: ', widgets);
      //if we can actually place the widget

      //ADD RESTRAINER HERE TO CHECK IF WE CAN PLACE THE WIDGET
      /* if (
          !restrainer({
            visualComplexity: generateModalityMeasure(),
            audioComplexity: generateModalityMeasure(),
          })
        )
          return; */

      // dispatch action to add new widget
      dispatch(addWidget(widgetToDeploy));
      dispatch(addWidgetToSection(sectionID));
    }
  }, [messages]);

  return <Home />;
};

export default Prototype;
