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
import { useEffect, useRef } from 'react';
import Layout from 'src/components/Layout';
import type { Section } from 'src/types/support-types.ts';
import { v4 as uuid } from 'uuid';
import assimilator from 'src/prototype/assimilator';
import selector from 'src/prototype/selector';

const Prototype2 = () => {
  const dispatch = useAppDispatch();
  const firstRender1 = useRef(true);
  const firstRender2 = useRef(true);

  // add initial section to the pixel map
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
  }

  // get the pixel map and sections that were just made
  const pixelMap = useAppSelector(getPixelMap);
  const sections = useAppSelector(getSections);

  const widgets = useAppSelector(getWidgets);

  // call assimilator and add widget to state if it can find a space
  useEffect(() => {
    console.log('running through assimilator...');
    const topHalf: Element = {
      id: 'topHalf',
      modality: 'visual',
      type: 'text',
      xWidget: 10,
      yWidget: 0,
      w: 30,
      h: 24,
    };
    const bottomHalf: Element = {
      id: 'bottomHalf',
      modality: 'visual',
      type: 'text',
      xWidget: 10,
      yWidget: 25,
      w: 30,
      h: 25,
    };
    const widget: Widget = {
      id: 'tinder',
      elements: [topHalf, bottomHalf],
      type: 'tinder',
      maxAmount: 1,
      x: 100,
      y: 200,
      w: 50,
      h: 50,
      useElementLocation: false,
      canOverlap: false,
    };

    // call assimilator here...
    const { widgetToDeploy } = assimilator({
      // find if there is room for us to put the widget down (returns null if there is not room)
      possibleWidgets: [widget],
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
  }, []);

  //run through the MS with each message type in array

  const listOfMsg = ['RequestApprovalToAttack','MissileToOwnshipDetected','AcaFuelLow','AcaHeadingToBase'];
  
  let coin = 0;
  useEffect(() => {

    if(coin < listOfMsg.length){
      //get next message
      const currentMessage = listOfMsg[coin];
      const { message, possibleWidgets } = selector({
        message: currentMessage,
      })

      console.log('running through assimilator...');
      // call assimilator here...
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

      coin++; //increment coin to next message
    }
  }, []);

  return <Layout widgets={widgets} />;
};

export default Prototype2;
