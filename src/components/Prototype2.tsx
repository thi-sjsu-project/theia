/**
 * For April 12, 2024 Friday meeting
 *
 * TODOs:
 * Create grid
 * Moving ownship and drones
 * Integrate sockets
 * ...
 */
import {
  addMapSection,
  getPixelMap,
  getSections,
  addWidget,
  getWidgets,
} from 'src/redux/slices/cmSlice';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import type { Widget, Element } from 'src/types/modalities';
import { useEffect, useRef, useState } from 'react';
import Layout from 'src/components/Layout';
import type { Section } from 'src/types/support-types.ts';
import { v4 as uuid } from 'uuid';
import assimilator from 'src/prototype/assimilator';
import selector from 'src/prototype/selector';
import { ONE_SECOND_IN_MS } from 'src/utils/constants';

const Prototype2 = () => {
  const [messages, setMessages] = useState<string[]>([]);
  console.log('messages:', messages);

  const dispatch = useAppDispatch();
  // get the pixel map and sections that were just made
  const pixelMap = useAppSelector(getPixelMap);
  const sections = useAppSelector(getSections);
  const widgets = useAppSelector(getWidgets);

  const firstRender1 = useRef(true);
  const firstRender2 = useRef(true);

  // generate messages every five seconds and udpate local state
  useEffect(() => {
    let msgIndex = 0;
    const listOfMsg = [
      'tinder',
      'AcaHeadingToBase',
      'AcaHeadingToBase',
      'RequestApprovalToAttack',
      'MissileToOwnshipDetected',
      'AcaFuelLow',
    ];

    const generateMessage = () => {
      if (msgIndex >= listOfMsg.length) return;

      const message = listOfMsg[msgIndex];
      setMessages((prevMessages) => [...prevMessages, message]);
      msgIndex++;
    };

    // generate message every five seconds
    const interval = setInterval(generateMessage, ONE_SECOND_IN_MS * 5);

    return () => clearInterval(interval);
  }, []);

  // run whenever messages array changes
  useEffect(() => {
    if (messages.length === 0) return;

    console.log('passing message to the selector');
    // latest message in the last one in the list
    const currentMessage = messages[messages.length - 1];
    console.log('currentMessage:', currentMessage);

    const { message, possibleWidgets } = selector({
      message: currentMessage,
    });

    possibleWidgets[0].id = uuid();

    console.log('running through assimilator...');
    const { widgetToDeploy } = assimilator({
      // find if there is room for us to put the widget down (returns null if there is not room)
      possibleWidgets: possibleWidgets,
      pixelMap,
      sections,
    });

    console.log('widgetToDeploy ' + widgetToDeploy);

    if (widgetToDeploy) {
      console.log('widget deployed:', widgetToDeploy);
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

    console.log('dispatching addMapSection');
    dispatch(addMapSection(tinderSection));

    const requestSection: Section = {
      x: 1000,
      y: 500,
      w: 800,
      h: 200,
      priority: 10,
      type: 'request',
    };

    console.log('dispatching addMapSection');
    dispatch(addMapSection(requestSection));

    const highWarningSection: Section = {
      x: 500,
      y: 200,
      w: 100,
      h: 100,
      priority: 10,
      type: 'highWarning',
    };

    console.log('dispatching addMapSection');
    dispatch(addMapSection(highWarningSection));

    const lowWarningSection: Section = {
      x: 200,
      y: 400,
      w: 100,
      h: 100,
      priority: 10,
      type: 'lowWarning',
    };

    console.log('dispatching addMapSection');
    dispatch(addMapSection(lowWarningSection));

    const messageSection: Section = {
      x: 1500,
      y: 200,
      w: 200,
      h: 200,
      priority: 10,
      type: 'message',
    };

    console.log('dispatching addMapSection');
    dispatch(addMapSection(messageSection));
  }

  return (
    <div className="h-screen flex items-center justify-center gap-10">
      <Layout widgets={widgets} />

      <div className="w-[40rem] flex flex-col items-center gap-4">
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

export default Prototype2;
