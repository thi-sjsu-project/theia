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
// ~~~~~~~ Constants ~~~~~~~
import { ownship, drones, initialShips } from 'src/utils/initialShips';
import { initialSections } from 'src/utils/initialSections';
import Home from 'src/components/Home';
import monitor from 'src/prototype/monitor';
import { initailMapWarnings } from 'src/utils/initialMapWarnings';
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
      widgets: { ...initialShips, ...initailMapWarnings },
      messages: [],
      sections: [...initialSections],
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

    reactToMessage({dispatch, currentMessage});
  }, [messages]);

  useEffect(() => {
    let allWidgetsInNewStressLPDIds: string[] = Object.keys(widgets); //this should be the actual new ones
    stressChangeHandler({dispatch:dispatch, allWidgetIds:Object.keys(widgets), allMessages: messages, allWidgetsInNewStressLPDIds: allWidgetsInNewStressLPDIds})
  }, [stressLevel])

  return <Home />;
};

export default Prototype;
