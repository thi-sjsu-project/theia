import type {
  Message,
  MissileToOwnshipDetected,
  RequestApprovalToAttack,
} from 'src/types/schema-types';
import { v4 as uuid } from 'uuid';
import lpdHelper from 'src/utils/lpdHelper';
import DANGER_ICON from 'src/assets/icons/threats/missile-sm-emph.svg';
import type {
  Element,
  IconElement,
  InformationElement,
} from 'src/types/element';
import type { Widget, MapWarningWidget } from 'src/types/widget';
import type { WidgetCluster } from 'src/types/support-types';
import { mapTargetTypeToWarningIcon } from 'src/prototype/utils/helpers';
import {
  LIST_WIDGET_HEIGHT,
  LIST_WIDGET_WIDTH,
} from 'src/prototype/utils/constants';

// Functions to create widgets, elements, and sections for each message type
const requestApprovalToAttackMessageHigh = (
  message: RequestApprovalToAttack,
) => {
  const listWidgetId = uuid();
  const pearceScreenElements: Element[] = [
    lpdHelper.generateRequestApprovalElement(
      lpdHelper.generateBaseElement(
        uuid(),
        'visual',
        30,
        30,
        message.priority,
        'list',
      ),
      message.id,
      message.conversationId,
      listWidgetId,
      lpdHelper.generateIconElement(
        lpdHelper.generateBaseElement(uuid(), 'visual', 56, 56),
        mapTargetTypeToWarningIcon(message.data.target.type),
      ),
      lpdHelper.generateButtonElement(
        lpdHelper.generateBaseElement(uuid(), 'visual', 30, 80),
        'Deny',
      ),
      lpdHelper.generateButtonElement(
        lpdHelper.generateBaseElement(uuid(), 'visual', 30, 80),
        'Approve',
      ),
    ),
  ];

  const minimapWidgetId1 = uuid();
  const minimapElements: Element[] = [
    {
      id: uuid(),
      modality: 'visual',
      type: 'icon',
      h: 80,
      w: 80,
      widgetId: minimapWidgetId1,
      src: mapTargetTypeToWarningIcon(message.data.target.type),
    } satisfies IconElement,
    {
      id: uuid(),
      modality: 'visual',
      type: 'information',
      h: 70,
      w: 150,
      message,
      size: 'M', // size L when stress is low
      collapsed: true, // initially, the information elemnt is not displayed
      expirationIntervalMs: 3000,
      onExpiration: 'deescalate',
      widgetId: minimapWidgetId1,
    } satisfies InformationElement,
  ];

  const minimapWidgets: Widget[] = [
    {
      id: minimapWidgetId1, // this should be something static?
      sectionType: 'minimap',
      type: 'map-warning',
      x: message.data.target.location.x,
      y: message.data.target.location.y,
      w: 80,
      h: 80,
      screen: '/minimap',
      canOverlap: true,
      useElementLocation: false,
      maxAmount: 10,
      tags: ['specify', 'map-warning'],

      elements: minimapElements,
    } satisfies MapWarningWidget,
  ];

  return {
    sections: [],
    possibleClusters: [
      generateCluster([
        lpdHelper.generateListWidget(
          lpdHelper.generateBaseWidget(
            listWidgetId,
            'tinder',
            100,
            100,
            LIST_WIDGET_WIDTH,
            LIST_WIDGET_HEIGHT,
            '/pearce-screen',
            false,
            false,
            1,
            [...pearceScreenElements],
            ['message'],
          ),
        ),
        ...minimapWidgets,
      ]),
    ],
  };
};

const acaFuelLowMessageHigh = (message: Message) => {
  const elements: Element[] = [];
  elements.push(
    lpdHelper.generateTableElement(
      lpdHelper.generateBaseElement(
        uuid(),
        'visual',
        50,
        200,
        message.priority,
        'list',
      ),
      2,
      2,
      [
        ['Fuel', 'Low'],
        ['Altitude', 'Low'],
      ],
    ),
  );
  return {
    sections: [],
    possibleClusters: [
      generateCluster([
        lpdHelper.generateListWidget(
          lpdHelper.generateBaseWidget(
            uuid(),
            'tinder',
            500,
            500,
            LIST_WIDGET_WIDTH,
            LIST_WIDGET_HEIGHT,
            '/pearce-screen',
            false,
            false,
            1,
            [...elements],
            ['message'],
          ),
        ),
      ]),
    ],
  };
};

const missileToOwnshipDetectedMessageHigh = (
  message: MissileToOwnshipDetected,
) => {
  const listWidgetId = uuid();
  const pearceScreenElements: Element[] = [
    lpdHelper.generateMissileIncomingElement(
      lpdHelper.generateBaseElement(
        uuid(),
        'visual',
        50,
        200,
        message.priority,
        'list',
      ),
      message.id,
      message.conversationId,
      listWidgetId,
      lpdHelper.generateIconElement(
        lpdHelper.generateBaseElement(uuid(), 'visual', 56, 56),
        DANGER_ICON,
      ),
    ),
  ];

  const minimapWidgetId1 = uuid();
  const minimapElements: Element[] = [
    {
      id: uuid(),
      modality: 'visual',
      type: 'icon',
      h: 128,
      w: 128,
      widgetId: minimapWidgetId1,
      src: mapTargetTypeToWarningIcon('missile'),
      expirationIntervalMs: 5000,
      onExpiration: 'escalate',
    } satisfies IconElement,
    {
      id: uuid(),
      modality: 'visual',
      type: 'information',
      h: 70,
      w: 150,
      message,
      size: 'M', // size L when stress is low
      collapsed: true, // initially, the information elemnt is not displayed
      expirationIntervalMs: 3000,
      onExpiration: 'deescalate',
      widgetId: minimapWidgetId1,
    } satisfies InformationElement,
  ];

  const minimapWidgets: Widget[] = [
    {
      id: minimapWidgetId1, // this should be something static?
      sectionType: 'minimap',
      type: 'map-warning',
      x: message.data.missileLocation.x,
      y: message.data.missileLocation.y,
      w: 128,
      h: 128,
      screen: '/minimap',
      canOverlap: true,
      useElementLocation: false,
      maxAmount: 10,

      tags: ['specify', 'map-warning'],

      elements: minimapElements,
    } satisfies MapWarningWidget,
  ];

  return {
    sections: [],
    possibleClusters: [
      generateCluster([
        lpdHelper.generateListWidget(
          lpdHelper.generateBaseWidget(
            listWidgetId,
            'tinder',
            100,
            100,
            LIST_WIDGET_WIDTH,
            LIST_WIDGET_HEIGHT,
            '/pearce-screen',
            false,
            true,
            1,
            [...pearceScreenElements],
            ['message'],
          ),
        ),
        ...minimapWidgets,
      ]),
    ],
  };
};

const acaDefectMessageHigh = (message: Message) => {
  const elements: Element[] = [];
  elements.push(
    lpdHelper.generateTableElement(
      lpdHelper.generateBaseElement(
        uuid(),
        'visual',
        50,
        200,
        message.priority,
        'list',
      ),
      2,
      2,
      [
        ['Defect', 'Engine'],
        ['Altitude', 'Low'],
      ],
    ),
  );
  return {
    sections: [],
    possibleClusters: [
      generateCluster([
        lpdHelper.generateListWidget(
          lpdHelper.generateBaseWidget(
            uuid(),
            'minimap',
            500,
            500,
            LIST_WIDGET_WIDTH,
            LIST_WIDGET_HEIGHT,
            '/pearce-screen',
            false,
            true,
            1,
            [...elements],
            ['aca-defect'],
          ),
        ),
      ]),
    ],
  };
};

const acaHeadingToBaseMessageHigh = (message: Message) => {
  const elements: Element[] = [];
  elements.push(
    lpdHelper.generateTextElement(
      lpdHelper.generateBaseElement(
        uuid(),
        'visual',
        30,
        200,
        message.priority,
        'list',
      ),
      'Aircraft heading to base',
    ),
  );
  return {
    sections: [],
    possibleClusters: [
      generateCluster([
        lpdHelper.generateListWidget(
          lpdHelper.generateBaseWidget(
            uuid(),
            'tinder',
            500,
            500,
            LIST_WIDGET_WIDTH,
            LIST_WIDGET_HEIGHT,
            '/pearce-screen',
            false,
            true,
            1,
            [...elements],
            ['message'],
          ),
        ),
      ]),
    ],
  };
};

const generateCluster = (widgets: Widget[]): WidgetCluster => ({
  widgets: widgets,
});

// Map each message type to its corresponding LPD function
const highLPDMessageFunctions: any = {
  RequestApprovalToAttack: requestApprovalToAttackMessageHigh,
  AcaFuelLow: acaFuelLowMessageHigh,
  MissileToOwnshipDetected: missileToOwnshipDetectedMessageHigh,
  AcaDefect: acaDefectMessageHigh,
  AcaHeadingToBase: acaHeadingToBaseMessageHigh,
};

const highLPD = (message: Message) => {
  if (message.priority !== -1)
    //if the message is a real message, return the clusters
    return highLPDMessageFunctions[message.kind](message);

  //if we get this far, we can return all widgets in this LPD
  const tempMessage = {
    //make a dummy widget to put into LPD function
    priority: 2,
    data: {
      target: {
        location: {
          x: 0,
          y: 0,
        },
      },
      missileLocation: {
        x: 0,
        y: 0,
      },
    },
  };

  const messageKinds = [
    //all message kinds, so we can get all widgets
    'RequestApprovalToAttack',
    'AcaFuelLow',
    'AcaDefect',
    'AcaHeadingToBase',
    'MissileToOwnshipDetected',
  ];

  //get all widgets as list of widgets instead of list of clusters
  let allPossibleWidgets: any = [];
  messageKinds.forEach((kind) => {
    //for each message kind
    highLPDMessageFunctions[kind](tempMessage).possibleClusters.forEach(
      (cluster: WidgetCluster) => {
        //for each cluster in kind
        cluster.widgets.forEach((widget: Widget) => {
          //for eahc widget in widget cluster
          allPossibleWidgets.push(widget); //add the widget
        });
      },
    );
  });
  return allPossibleWidgets;
};

export default highLPD;
