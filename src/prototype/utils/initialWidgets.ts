import { v4 as uuid } from 'uuid';
import LeftScreenMap from 'src/assets/left-bottom-map.png';
import LeftScreenVideo from 'src/assets/left-video.png';
import type { BasicWidget, HistoryWidget, WidgetMap } from 'src/types/widget';
import { type ImageElement } from 'src/types/element';
import {
  initialShips,
  drones,
  ownship,
} from 'src/prototype/utils/initialShips';
import { initialAcaHeaderWidget } from 'src/prototype/utils/initialAcaHeader';

const videoBoxUuid = uuid();
const mapBoxUuid = uuid();
const historyBoxUuid = uuid();

const initialLeftScreenWidgets: WidgetMap = {
  // left video box widget
  [videoBoxUuid]: {
    id: videoBoxUuid,
    type: 'basic',
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
      {
        id: uuid(),
        type: 'approve-deny-button',
        widgetId: mapBoxUuid,
        modality: 'visual',
        w: 472,
        h: 112,
      },
    ],
    maxAmount: 1,
    tags: ['video'],
  } satisfies BasicWidget,

  // left map box widget
  [mapBoxUuid]: {
    id: mapBoxUuid,
    type: 'basic',
    screen: '/pearce-screen',
    sectionType: 'map-video',
    x: 50,
    y: 600,
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
    tags: ['map'],
  } satisfies BasicWidget,

  // center box widget
  [historyBoxUuid]: {
    id: historyBoxUuid,
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
    tags: ['history'],
  } satisfies HistoryWidget,
};

const initialMinimapWidgets: WidgetMap = {
  [initialAcaHeaderWidget.id]: initialAcaHeaderWidget,
  ...initialShips,
};

const initialWidgets = {
  // ...initialWarnings,
  ...initialLeftScreenWidgets,
  ...initialMinimapWidgets,
};

export { drones, ownship, initialWidgets };
