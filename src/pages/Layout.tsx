import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Gaze from 'src/ui/Gaze';
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

const Layout = () => {
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
      // console.log('elements in gaze: ', elemsInGaze);
    }
  }, [mousePosition]);

  // print out the gazes and keys
  useEffect(() => {
    // console.log('gazesAndKeys', gazesAndKeys);
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
    if (mouseButtonDown.toString() !== '') {
      const time = new Date().toISOString();
      dispatch(
        addKeyDown({
          elemsInGaze: elemsInGaze,
          keyPress: mouseButtonDown.toString(),
          timeEnteredGaze: time
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
    if (mouseButtonUp !== '') {
      dispatch(removeKeyDown(mouseButtonUp.toString()));
      document.dispatchEvent(new KeyboardEvent('mouseup', { key: '_' }));
      document.dispatchEvent(new KeyboardEvent('mousedown', { key: '_' }));
    }
  }, [mouseButtonUp]);


  // Redirect to /prototype if the user is on the root path
  useEffect(() => {
    if (pathname === '/') {
      navigate('/prototype');
    }
  }, [pathname, navigate]);
  

  return (
    <div>
      {/* {pathname !== '/prototype' && <Navigation />} */}
      {pathname !== '/prototype' && <Gaze mousePosition={mousePosition} />}

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
