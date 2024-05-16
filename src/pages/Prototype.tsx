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
  addMessage,
  getAllElements,
} from 'src/redux/slices/minimapSlice';
// ~~~~~~~ Cusdom Hooks ~~~~~~~
import useWorldSim from 'src/hooks/useWorldSim';
// ~~~~~~~ Prototype ~~~~~~~
import assimilator from 'src/prototype/assimilator';
import selector from 'src/prototype/selector';
import monitor from 'src/prototype/monitor';
import restrainer from 'src/prototype/restrainer';
// ~~~~~~~ Constants ~~~~~~~
import { ownship, drones } from 'src/prototype/lpd/initialLPD';
// ~~~~~~~ Components ~~~~~~~
import Home from 'src/components/Home';
import reactToMessage from 'src/prototype/reactToMessage';
import stressChangeHandler from 'src/prototype/stressChangeHandler';

const Prototype = () => {
  // ~~~~~ Custom Hooks ~~~~~~
  const { messages, stressLevel } = useWorldSim();

  // ~~~~~ Selectors ~~~~~~
  const sections = useAppSelector(getSections);
  const widgets = useAppSelector(getWidgets);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // Intiailize minimap state
    const initialState: InitialMinimapState = {
      visualComplexity: 0,
      audioComplexity: 0,
      ownship,
      drones,
      messages: [],
      // Initial sections, widgets, and elements
      ...selector(),
    };

    dispatch(initializeState(initialState));
  }, [dispatch]);

  //call the monitor
  useEffect(() => {
    const intervalID = setInterval(() => {
      monitor({ dispatch });
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

    dispatch(addMessage(currentMessage));

    reactToMessage({ dispatch, currentMessage, stressLevel });
  }, [messages]);

  useEffect(() => {
    let allWidgetsInNewStressLPDIds: string[] = Object.keys(widgets); //this should be the actual new ones
    stressChangeHandler({
      dispatch: dispatch,
      allWidgetIds: Object.keys(widgets),
      allMessages: messages,
      allWidgetsInNewStressLPDIds: allWidgetsInNewStressLPDIds,
    });
  }, [stressLevel]);

  return <Home />;
};

export default Prototype;
