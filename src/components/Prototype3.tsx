import { useEffect, useRef, useState } from 'react';
import Minimap from './Minimap';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import {
  addMapSection,
  addWidget,
  getPixelMap,
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

const Prototype3 = () => {
  const { messages, stressLevel } = useWorldSim();
  console.log('worldSimMessages:', messages);
  console.log('stressLevel:', stressLevel);

  const dispatch = useAppDispatch();

  // get the pixel map and sections that were just made
  const pixelMap = useAppSelector(getPixelMap);
  const sections = useAppSelector(getSections);
  const widgets = useAppSelector(getWidgets);
  const mousePosition = useMousePosition();
  const keyDown = useKeyDown();

  useEffect(() => {
    const elementsInGaze = findElementsInGaze(
      mousePosition,
      dispatch,
      widgets,
      50,
      0.1,
      0.1,
    );
    if (elementsInGaze.length > 0) {
      console.log('elements in gaze:', elementsInGaze);
    }
  }, [mousePosition]);

  const firstRender1 = useRef(true);
  const firstRender2 = useRef(true);

  // run whenever there is a new message
  useEffect(() => {
    if (messages.length === 0) return;

    //console.log('passing message to the selector');
    // latest message in the last one in the list
    const currentMessage = messages[messages.length - 1];
    //console.log('currentMessage:', currentMessage);

    const { message, possibleWidgets } = selector({
      message: currentMessage.kind,
    });

    possibleWidgets[0].id = uuid();

    //console.log('running through assimilator...');
    const { widgetToDeploy } = assimilator({
      // find if there is room for us to put the widget down (returns null if there is not room)
      possibleWidgets: possibleWidgets,
      pixelMap,
      sections,
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
    }
  }, [messages]);

  // add initial sections to the pixel map
  if (firstRender1.current) {
    // only run in the first render
    firstRender1.current = false;

    const tinderSection: Section = {
      x: 50,
      y: 40,
      w: 200,
      h: 800,
      priority: 10,
      type: 'tinder',
    };

    //console.log('dispatching addMapSection');
    dispatch(addMapSection(tinderSection));

    const requestSection: Section = {
      x: 50,
      y: 850,
      w: 800,
      h: 200,
      priority: 10,
      type: 'request',
    };

    //console.log('dispatching addMapSection');
    dispatch(addMapSection(requestSection));

    const highWarningSection: Section = {
      x: 800,
      y: 200,
      w: 500,
      h: 250,
      priority: 10,
      type: 'highWarning',
    };

    //console.log('dispatching addMapSection');
    dispatch(addMapSection(highWarningSection));

    const lowWarningSection: Section = {
      x: 1800,
      y: 450,
      w: 500,
      h: 200,
      priority: 10,
      type: 'lowWarning',
    };

    //console.log('dispatching addMapSection');
    dispatch(addMapSection(lowWarningSection));

    const messageSection: Section = {
      x: 1800,
      y: 200,
      w: 200,
      h: 200,
      priority: 10,
      type: 'message',
    };

    //console.log('dispatching addMapSection');
    dispatch(addMapSection(messageSection));
  }

  return (
    <div>
      <Minimap widgets={widgets} />
    </div>
  );
};

export default Prototype3;
