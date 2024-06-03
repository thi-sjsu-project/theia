import { useEffect } from 'react';
// ~~~~~~~ Redux ~~~~~~~
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import {
  type InitialMinimapState,
  getWidgets,
  initializeState,
  getStressLevel,
  setStressLevel,
} from 'src/redux/slices/cmSlice';
import { addMessage } from 'src/redux/slices/conversationSlice';
// ~~~~~~~ Cusdom Hooks ~~~~~~~
import useWorldSim from 'src/hooks/useWorldSim';
// ~~~~~~~ Prototype ~~~~~~~
import selector from 'src/prototype/selector';
import monitor from 'src/prototype/monitor';
// ~~~~~~~ Constants ~~~~~~~
import { ownship, drones } from 'src/prototype/lpd/initialLPD';
// ~~~~~~~ Components ~~~~~~~
import Home from 'src/components/Home';
import reactToMessage from 'src/prototype/reactToMessage';
import stressChangeHandler from 'src/prototype/stressChangeHandler';
import type { Widget } from 'src/types/widget';

const Prototype = () => {
  // ~~~~~ Custom Hooks ~~~~~~
  const { messages, stressLevel } = useWorldSim();
  const currentStressLevel = useAppSelector(getStressLevel);

  // ~~~~~ Selectors ~~~~~~
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

    // latest message in the first one in the list
    const currentMessage = messages[0];

    dispatch(addMessage(currentMessage));
    reactToMessage({ dispatch, currentMessage, stressLevel });
  }, [messages]);

  useEffect(() => {
    if (stressLevel !== 0) {
      // don't run at start
      console.log('stress level', stressLevel);
      let allWidgetsInNewStressLPD: Widget[] = selector({
        stressLevel: stressLevel,
      });

      stressChangeHandler({
        dispatch: dispatch,
        allWidgets: Object.values(widgets),
        allMessages: messages,
        allWidgetsInNewStressLPD: allWidgetsInNewStressLPD,
        stressLevel,
      });
    }
  }, [currentStressLevel]);

  useEffect(() => {
    dispatch(setStressLevel(Math.min(Math.floor(stressLevel * 3), 2)));
  }, [stressLevel]);

  return <Home />;
};

export default Prototype;
