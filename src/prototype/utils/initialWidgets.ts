import { v4 as uuid } from 'uuid';
import LeftScreenMap from 'src/assets/left-bottom-map.png';
import LeftScreenVideo from 'src/assets/left-video.png';
import type { BasicWidget, EscalationModeWidget, HistoryWidget, WidgetMap } from 'src/types/widget';
import type { ImageElement, EscalationModeElement } from 'src/types/element';
import {
  initialShips,
  drones,
  ownship,
} from 'src/prototype/utils/initialShips';
import { initialAcaHeaderWidget } from 'src/prototype/utils/initialAcaHeader';
import SCALE_ORIENTATION_SVG from 'src/assets/scale-and-orientation.svg';
//import type EscalationModeElement from 'src/components/Element/Complex/EscalationModeElement';

const videoBoxUuid = uuid();
const mapBoxUuid = uuid();
const historyBoxUuid = uuid();
const EscalationModeUuid = uuid();

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

const scaleOrientationWidgetId = uuid();
const scaleOrientationWidget: BasicWidget = {
  id: scaleOrientationWidgetId,
  sectionType: 'free',
  screen: '/minimap',
  type: 'basic',
  x: 1696,
  y: 960,
  w: 174,
  h: 78,
  canOverlap: false,
  useElementLocation: false,
  maxAmount: 2,
  elements: [
    {
      id: uuid(),
      modality: 'visual',
      widgetId: scaleOrientationWidgetId,
      h: 78,
      w: 174,
      canOverlap: true,
      type: 'image',
      src: SCALE_ORIENTATION_SVG,
    } satisfies ImageElement,
  ],
  tags: ['header'],
};

const initialMinimapWidgets: WidgetMap = {
  [EscalationModeUuid]: {
    id: EscalationModeUuid,
    type: 'escalation',
    screen: '/minimap',
    sectionType: 'minimap',
    x: 560,
    y: 85,
    w: 1360,
    h: 995,
    canOverlap: false,
    useElementLocation: false,
    priority: 10,
    elements: [
      {
        id: uuid(),
        modality: 'visual',
        widgetId: EscalationModeUuid,
        h: 1080,
        w: 1360,
        canOverlap: false,
        type: 'escalation'
      } satisfies EscalationModeElement,
    ],
    maxAmount: 1,
    tags: ['video'],
  } satisfies EscalationModeWidget,
  [initialAcaHeaderWidget.id]: initialAcaHeaderWidget,
  [scaleOrientationWidget.id]: scaleOrientationWidget,
  ...initialShips,
};

const initialWidgets = {
  // ...initialWarnings,
  ...initialLeftScreenWidgets,
  ...initialMinimapWidgets,
};

export { drones, ownship, initialWidgets };
