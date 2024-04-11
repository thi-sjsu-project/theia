/**
 * For April 12, 2024 Friday meeting
 *
 * TODOs:
 * Create grid
 * Moving ownship and drones
 * Integrate sockets
 * ...
 */
import { initializeMap, addMapSection, getPixelMap, getSections, addWidget } from 'src/redux/slices/cmSlice';
import { useAppDispatch, useAppSelector} from 'src/redux/hooks';
import type { Widget, Element } from 'src/types/modalities';
import { useEffect } from 'react';
import Layout from 'src/components/Layout';
import type {Section} from 'src/types/support-types.ts'
import assimilator from 'src/prototype/assimilator';

const Prototype2 = () => {
  const dispatch = useAppDispatch();
  const tinderSection: Section = {
    x: 50,
    y: 40,
    w: 200,
    h: 800,
    priority: 10,
    type: 'tinder',

  }

  useEffect(() => {
    dispatch(initializeMap());
    dispatch(addMapSection(tinderSection))
  }, []);

  const pixelMap = useAppSelector(getPixelMap)
  const sections = useAppSelector(getSections)
  console.log("sections")
  console.log(sections)

  useEffect(() => {

    
    const topHalf: Element = {
      id: 'topHalf',
      modality: 'visual',
      type: 'text',
      xWidget: 10,
      yWidget: 0,
      w: 30,
      h: 24
      
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
      //find if there is room for us to put the widget down (returns null if there is not room)
      possibleWidgets: [widget],
      pixelMap,
      sections,
    });
    console.log("widgetToDeploy "+widgetToDeploy);
    // consult the restrainer here...
    if (widgetToDeploy) {
      console.log("did it! "+widgetToDeploy);
      console.log(widgetToDeploy);
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
  }, [sections]);

  

  return <Layout />;
};

export default Prototype2;
