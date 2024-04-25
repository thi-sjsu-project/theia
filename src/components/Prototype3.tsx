import { useEffect, useRef, useState } from 'react';
import Minimap from 'src/components/Minimap';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import {
  addWidget,
  addWidgetToSection,
  getSections,
  getWidgets,
} from 'src/redux/slices/minimapSlice';
import { useMousePosition } from 'src/hooks/useMousePosition';
import type { Section } from 'src/types/support-types';
import selector from 'src/prototype/selector';
import assimilator from 'src/prototype/assimilator';
import { v4 as uuid } from 'uuid';
import { findElementsInGaze } from 'src/hooks/findElementsInGaze';
import { useKeyDown } from 'src/hooks/useKeyDown';
import useWorldSim from 'src/hooks/useWorldSim';
import type { Message } from 'src/types/schema-types';
import { useMouseButtonDown } from 'src/hooks/useMouseButtonDown';
import { ONE_SECOND_IN_MS } from 'src/utils/constants';
import useGenerateMessages from 'src/hooks/useGenerateMessages';
import {
  getElementsInGaze,
  setElementsInGaze,
} from 'src/redux/slices/gazeSlice';

const Prototype3 = () => {
  // const { messages, stressLevel } = useWorldSim();
  // console.log('worldSimMessages:', messages);
  // console.log('stressLevel:', stressLevel);

  const dispatch = useAppDispatch();

  // get the sections that were just made
  const sections = useAppSelector(getSections);
  const widgets = useAppSelector(getWidgets);
  const elemsInGaze = useAppSelector(getElementsInGaze);
  const mousePosition = useMousePosition();
  const keyDown = useKeyDown();
  const mouseButtonDown = useMouseButtonDown();

  useEffect(() => {
    const elementsInGaze = findElementsInGaze(
      mousePosition,
      dispatch,
      widgets,
      50,
      0.1,
      0.1,
    );
    dispatch(setElementsInGaze(elementsInGaze));
    console.log('elements in gaze: ', elemsInGaze);
  }, [mousePosition]);

  const { messages } = useGenerateMessages();

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

    possibleWidgets[0].id = uuid();

    //console.log('running through assimilator...');
    const { widgetToDeploy, sectionID } = assimilator({
      // find if there is room for us to put the widget down (returns null if there is not room)
      possibleWidgets: possibleWidgets,
      sections,
      widgets,
    });

    //console.log('widgetToDeploy ' + widgetToDeploy);

    if (widgetToDeploy) {
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
      <Minimap widgets={widgets} />

      <div className="absolute top-0 right-0 w-[30rem] flex flex-col gap-4">
        <div className="bg-green-200 w-full h-96 px-2 py-1">
          <p className="text-center text-5xl">List of Messages:</p>
          <ul className="overflow-y-scroll divide-y divide-stone-500 h-80">
            {messages.map((msg) => (
              <li key={msg}>
                <div>
                  <span className="text-3xl">
                    {msg === 'tinder' ? 'Tinder Message' : msg}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Prototype3;
