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
  getStressLevel,
  setStressLevel,
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
import type { Widget } from 'src/types/widget';

const Prototype = () => {
  // ~~~~~ Custom Hooks ~~~~~~
  const { messages, stressLevel } = useWorldSim();
  const currentStressLevel = useAppSelector(getStressLevel);

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

    dispatch(addMessage(currentMessage));
    reactToMessage({ dispatch, currentMessage, stressLevel });
  }, [messages]);

  // useEffect(() => {
  //   if(stressLevel != 0){ //don't run at start
  //     console.log('stress level', stressLevel)
  //     let allWidgetsInNewStressLPD: Widget[] = selector({stressLevel: stressLevel})
  //     console.log('allwiidgets',allWidgetsInNewStressLPD)
  //     let allWidgetsInNewStressLPDIds: string[] = allWidgetsInNewStressLPD.map(a => a.id); //get all widget ids from new stress level LPD and initial LPD

  //     stressChangeHandler({dispatch:dispatch, allWidgetIds:Object.keys(widgets), allMessages: messages, allWidgetsInNewStressLPDIds: allWidgetsInNewStressLPDIds, stressLevel:stressLevel})
  //   }
  // }, [currentStressLevel]);

  // useEffect(() => {
  //   dispatch(setStressLevel(Math.floor(stressLevel * 3)));
  // }, [stressLevel]);

  return <Home />;
};

export default Prototype;
