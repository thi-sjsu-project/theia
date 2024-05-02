import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
// ~~~~~~~ Components ~~~~~~~
import Gaze from 'src/ui/Gaze';
import Navigation from 'src/ui/Navigation';
import useWorldSim from 'src/hooks/useWorldSim';
// ~~~~~~~ Redux ~~~~~~~
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import {
  addElementToWidget,
  addWidget,
  addWidgetToSection,
  getSections,
  getWidgets,
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
import { findElementsInGaze } from 'src/hooks/findElementsInGaze';
// ~~~~~~~ Prototype ~~~~~~~
import assimilator from 'src/prototype/assimilator';
import selector from 'src/prototype/selector';
// ~~~~~~~ Constants ~~~~~~~
import { GAZE_RADIUS } from 'src/utils/constants';
import monitor from 'src/prototype/monitor';
const CIRCLE_PERCENTAGE_THRESH = 0.1;
const ELEMENT_PERCENTAGE_THRESH = 0.1;

const Root = () => {
  // ~~~~~ React Router ~~~~~~
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // ~~~~~ Custom Hooks ~~~~~~
  const { messages, stressLevel } = useWorldSim();
  const mousePosition = useMousePosition();
  const keyDown = useKeyDown();
  const keyUp = useKeyUp();
  const mouseButtonDown = useMouseButtonDown();
  const mouseButtonUp = useMouseButtonUp();

  // ~~~~~ Selectors ~~~~~~
  const sections = useAppSelector(getSections);
  const widgets = useAppSelector(getWidgets);
  const gazesAndKeys = useAppSelector(getGazesAndKeys);
  const elemsInGaze: ElementInGaze[] = useAppSelector(getElementsInGaze);

  const dispatch = useAppDispatch();

  // Redirect to /minimap if the user is on the root path
  useEffect(() => {
    if (pathname === '/') {
      navigate('/minimap');
    }
  }, [pathname, navigate]);

  // on mouse position move, check for elements in gaze
  useEffect(() => {
    const elementsInGaze = findElementsInGaze(
      mousePosition,
      dispatch,
      widgets,
      GAZE_RADIUS,
      CIRCLE_PERCENTAGE_THRESH,
      ELEMENT_PERCENTAGE_THRESH,
    );
    dispatch(setElementsInGaze(elementsInGaze));
    if (elementsInGaze.length > 0) {
      console.log('elements in gaze: ', elemsInGaze);
    }
  }, [mousePosition]);

  // print out the gazes and keys
  useEffect(() => {
    console.log('gazesAndKeys', gazesAndKeys);
  }, [gazesAndKeys]);

  // on key or mouse press, log the press and what elements are in the gaze to state
  useEffect(() => {
    if (keyDown !== '') {
      const time = new Date().toISOString();
      dispatch(
        addKeyDown({ 
          elemsInGaze: elemsInGaze, 
          keyPress: keyDown.toString(), 
          timeEnteredGaze: time
        }),
      );
    }
  }, [keyDown]);

  useEffect(() => {
    if (mouseButtonDown !== '3') {
      const time = new Date().toISOString();
      dispatch(
        addKeyDown({
          elemsInGaze: elemsInGaze,
          keyPress: mouseButtonDown.toString(),
          timeEnteredGaze: time,
        }),
      );
    }
  }, [mouseButtonDown]);

  // on key or mouse release, delete the press that was logged to state and ensure the key/mouse is reset so we can accept the same key/mouse again
  useEffect(() => {
    console.log(keyUp);
    if (keyUp !== '') {
      dispatch(removeKeyDown(keyUp.toString()));
      document.dispatchEvent(new KeyboardEvent('keyup', { key: '_' }));
      document.dispatchEvent(new KeyboardEvent('keydown', { key: '_' }));
    }
  }, [keyUp]);

  useEffect(() => {
    if (mouseButtonUp !== '3') {
      dispatch(removeKeyDown(mouseButtonUp.toString()));
      document.dispatchEvent(new MouseEvent('mousedown', { button: 3 }));
      document.dispatchEvent(new MouseEvent('mouseup', { button:  3}));
      
    }
  }, [mouseButtonUp]);

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

    
    /*
    
    IMPORTANT
    must query restrainer before commiting to adding an element or widget
    
    */
    /*
    
    IMPORTANT
    must assign element expiration time here before adding to state
    
    */
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

  return (
    <div>
      <Navigation />
      <Gaze mousePosition={mousePosition} />

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
