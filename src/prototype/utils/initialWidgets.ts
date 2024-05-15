import { v4 as uuid } from 'uuid';
import LeftScreenMap from 'src/assets/left-bottom-map.png';
import LeftScreenVideo from 'src/assets/left-video.png';
import type { HistoryWidget, ListWidget } from 'src/types/widget';
import { type ImageElement } from 'src/types/element';

const videoBoxUuid = uuid();
const mapBoxUuid = uuid();

const initialLeftScreenWidgets = [
  // left video box widget
  {
    id: videoBoxUuid,
    type: 'list',
    screen: '/pearce-screen',
    sectionType: 'map-video',
    x: 50,
    y: 150,
    w: 500,
    h: 350,
    canOverlap: false,
    useElementLocation: false,
    priority: 10,
    elements: [
      {
        id: uuid(),
        type: 'image',
        src: LeftScreenVideo,
        w: 500,
        h: 350,
        widgetId: videoBoxUuid,
        modality: 'visual',
      } satisfies ImageElement,
    ],
    maxAmount: 1,
  } satisfies ListWidget,

  // left map box widget
  {
    id: mapBoxUuid,
    type: 'list',
    screen: '/pearce-screen',
    sectionType: 'map-video',
    x: 50,
    y: 550,
    w: 500,
    h: 350,
    canOverlap: false,
    useElementLocation: false,
    priority: 10,
    elements: [
      {
        id: uuid(),
        type: 'image',
        src: LeftScreenMap,
        w: 500,
        h: 350,
        widgetId: mapBoxUuid,
        modality: 'visual',
      } satisfies ImageElement,
    ],
    maxAmount: 1,
  } satisfies ListWidget,

  // center box widget
  {
    id: uuid(),
    type: 'history',
    screen: '/pearce-screen',
    sectionType: 'history',
    x: 625,
    y: 150,
    w: 840,
    h: 800,
    canOverlap: false,
    useElementLocation: false,
    priority: 10,
    elements: [],
    maxAmount: 1,
  } satisfies HistoryWidget,
];

const initialWidgets = [...initialLeftScreenWidgets];

export default initialWidgets;
