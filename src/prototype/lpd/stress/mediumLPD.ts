import type {
  Message,
  MissileToOwnshipDetected,
  RequestApprovalToAttack,
  ThreatDetected,
} from 'src/types/schema-types';
import lpdHelper from 'src/utils/lpdHelper';
import { v4 as uuid } from 'uuid';
import DANGER_ICON from 'src/assets/icons/threats/missile-sm-emph.svg';
import type {
  Widget,
  MapWarningWidget,
  ListWidget,
  EscalationModeWidget,
} from 'src/types/widget';
import type { WidgetCluster } from 'src/types/support-types';
import type {
  ButtonElement,
  Element,
  EscalationModeElement,
  IconElement,
  InformationElement,
  RequestApprovalElement,
  ThreatDetectedElement,
} from 'src/types/element';
import { mapTargetTypeToWarningIcon } from 'src/prototype/utils/helpers';
import {
  EXPIRATION_INTERVAL_MS,
  LIST_WIDGET_HEIGHT,
  LIST_WIDGET_WIDTH,
} from 'src/prototype/utils/constants';

const threatDetectedMessageMedium = (message: ThreatDetected) => {
  const listWidgetId = uuid();
  const pearceScreenElements = [
    {
      id: uuid(),
      widgetId: listWidgetId,
      type: 'threat-detected',
      messageType: message.kind,
      modality: 'visual',
      h: 100,
      w: 100,
      icon: {
        id: uuid(),
        modality: 'visual',
        type: 'icon',
        h: 56,
        w: 56,
        src: mapTargetTypeToWarningIcon(message.data.target.type),
      },
      messageId: message.id,
      conversationId: message.conversationId,
    } satisfies ThreatDetectedElement,
  ];
  const pearceScreenWidgets = [
    {
      id: listWidgetId,
      type: 'list',
      sectionType: 'tinder',
      x: 100,
      y: 100,
      w: LIST_WIDGET_WIDTH,
      h: LIST_WIDGET_HEIGHT,
      canOverlap: false,
      useElementLocation: false,
      elements: pearceScreenElements,
      tags: ['message'],
      screen: '/pearce-screen',
    } satisfies ListWidget,
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
    // {
    //   id: uuid(),
    //   modality: 'visual',
    //   type: 'request-approval',
    //   h: 700,
    //   w: 500,
    //   priority: message.priority,
    //   messageId: message.id,
    //   conversationId: message.conversationId,
    //   widgetId: minimapWidgetId1,
    //   icon: {
    //     id: uuid(),
    //     modality: 'visual',
    //     type: 'icon',
    //     h: 56,
    //     w: 56,
    //     src: mapTargetTypeToWarningIcon(message.data.target.type),
    //   } satisfies IconElement,
    //   leftButton: {
    //     id: uuid(),
    //     modality: 'visual',
    //     type: 'button',
    //     h: 50,
    //     w: 30,
    //     text: 'Deny',
    //   },
    //   rightButton: {
    //     id: uuid(),
    //     modality: 'visual',
    //     type: 'button',
    //     h: 50,
    //     w: 30,
    //     text: 'Approve',
    //   },
    // } satisfies RequestApprovalElement,
    {
      id: uuid(),
      modality: 'visual',
      type: 'information',
      h: 70,
      w: 150,
      message,
      size: 'L', // size L when stress is low
      collapsed: true, // initially, the information elemnt is not displayed
      expirationIntervalMs: EXPIRATION_INTERVAL_MS,
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
      generateCluster([...pearceScreenWidgets, ...minimapWidgets]),
    ],
  };
};

// Functions to create widgets, elements, and sections for each message type
const requestApprovalToAttackMessageMedium = (
  message: RequestApprovalToAttack,
) => {
  const listWidgetId = uuid();
  const pearceScreenElements = [
    {
      id: uuid(),
      modality: 'visual',
      type: 'request-approval',
      messageType: message.kind,
      h: 30,
      w: 30,
      widgetId: listWidgetId,
      messageId: message.id,
      conversationId: message.conversationId,
      icon: {
        id: uuid(),
        modality: 'visual',
        type: 'icon',
        h: 56,
        w: 56,
        src: mapTargetTypeToWarningIcon(message.data.target.type),
      },
      leftButton: {
        id: uuid(),
        modality: 'visual',
        type: 'button',
        h: 50,
        w: 30,
        text: 'Deny',
      } satisfies ButtonElement,
      rightButton: {
        id: uuid(),
        modality: 'visual',
        type: 'button',
        h: 50,
        w: 30,
        text: 'Approve',
      } satisfies ButtonElement,
    } satisfies RequestApprovalElement,
  ];
  const pearceScreenWidgets = [
    {
      id: listWidgetId,
      type: 'list',
      sectionType: 'tinder',
      x: 100,
      y: 100,
      w: LIST_WIDGET_WIDTH,
      h: LIST_WIDGET_HEIGHT,
      canOverlap: false,
      useElementLocation: false,
      elements: pearceScreenElements,
      tags: ['message'],
      screen: '/pearce-screen',
    } satisfies ListWidget,
  ];

  return {
    sections: [],
    possibleClusters: [generateCluster([...pearceScreenWidgets])],
  };
};

const acaFuelLowMessageMedium = (message: Message) => {
  // const elements: Element[] = [];
  // elements.push(
  //   lpdHelper.generateTableElement(
  //     lpdHelper.generateBaseElement(
  //       uuid(),
  //       'visual',
  //       50,
  //       200,
  //       message.priority,
  //     ),
  //     2,
  //     2,
  //     [
  //       ['Fuel', 'Low'],
  //       ['Altitude', 'Low'],
  //     ],
  //   ),
  // );
  // return {
  //   sections: [],
  //   possibleClusters: [
  //     generateCluster([
  //       lpdHelper.generateListWidget(
  //         lpdHelper.generateBaseWidget(
  //           uuid(),
  //           'tinder',
  //           500,
  //           500,
  //           LIST_WIDGET_WIDTH,
  //           LIST_WIDGET_HEIGHT,
  //           '/pearce-screen',
  //           false,
  //           false,
  //           1,
  //           [...elements],
  //           ['message'],
  //         ),
  //       ),
  //     ]),
  //   ],
  // };
  return {
    sections: [],
    possibleClusters: [],
  };
};

const missileToOwnshipDetectedMessageMedium = (
  message: MissileToOwnshipDetected,
) => {
  // const listWidgetId = uuid();
  // const pearceScreenElements: Element[] = [
  //   lpdHelper.generateMissileIncomingElement(
  //     lpdHelper.generateBaseElement(
  //       uuid(),
  //       'visual',
  //       50,
  //       200,
  //       message.priority,
  //     ),
  //     message.id,
  //     message.conversationId,
  //     listWidgetId,
  //     lpdHelper.generateIconElement(
  //       lpdHelper.generateBaseElement(uuid(), 'visual', 56, 56),
  //       DANGER_ICON,
  //     ),
  //   ),
  // ];

  const minimapWidgetId1 = uuid();
  const minimapElements: Element[] = [
    // {
    //   id: uuid(),
    //   modality: 'visual',
    //   type: 'icon',
    //   h: 128,
    //   w: 128,
    //   widgetId: minimapWidgetId1,
    //   src: mapTargetTypeToWarningIcon('missile'),
    //   onExpiration: 'escalate',
    // } satisfies IconElement,
    {
      id: uuid(),
      modality: 'visual',
      type: 'escalation',
      h: 950,
      w: 1360,
      canOverlap: true,
      widgetId: minimapWidgetId1,
      messageId: message.id,
      conversationId: message.conversationId,
    } satisfies EscalationModeElement,
  ];

  const minimapWidgets: Widget[] = [
    {
      id: minimapWidgetId1, // this should be something static?
      sectionType: 'minimap',
      type: 'escalation',
      x: 560,
      y: 85,
      h: 950,
      w: 1360,
      screen: '/minimap',
      canOverlap: true,
      useElementLocation: false,
      maxAmount: 10,

      tags: ['specify', 'escalation'],

      elements: minimapElements,
    } satisfies EscalationModeWidget,
  ];

  return {
    sections: [],
    possibleClusters: [
      generateCluster([
        // lpdHelper.generateListWidget(
        //   lpdHelper.generateBaseWidget(
        //     listWidgetId,
        //     'tinder',
        //     100,
        //     100,
        //     LIST_WIDGET_WIDTH,
        //     LIST_WIDGET_HEIGHT,
        //     '/pearce-screen',
        //     false,
        //     true,
        //     1,
        //     [...pearceScreenElements],
        //     ['message'],
        //   ),
        // ),
        ...minimapWidgets,
      ]),
    ],
  };
};

const acaDefectMessageMedium = (message: Message) => {
  // const elements: Element[] = [];
  // elements.push(
  //   lpdHelper.generateTableElement(
  //     lpdHelper.generateBaseElement(
  //       uuid(),
  //       'visual',
  //       50,
  //       200,
  //       message.priority,
  //     ),
  //     2,
  //     2,
  //     [
  //       ['Defect', 'Engine'],
  //       ['Altitude', 'Low'],
  //     ],
  //   ),
  // );
  // return {
  //   sections: [],
  //   possibleClusters: [
  //     generateCluster([
  //       lpdHelper.generateListWidget(
  //         lpdHelper.generateBaseWidget(
  //           uuid(),
  //           'tinder',
  //           500,
  //           500,
  //           LIST_WIDGET_WIDTH,
  //           LIST_WIDGET_HEIGHT,
  //           '/pearce-screen',
  //           false,
  //           true,
  //           1,
  //           [...elements],
  //           ['message'],
  //         ),
  //       ),
  //     ]),
  //   ],
  // };
  return {
    sections: [],
    possibleClusters: [],
  };
};

const acaHeadingToBaseMessageMedium = (message: Message) => {
  // const elements: Element[] = [];
  // elements.push(
  //   lpdHelper.generateTextElement(
  //     lpdHelper.generateBaseElement(
  //       uuid(),
  //       'visual',
  //       30,
  //       200,
  //       message.priority,
  //     ),
  //     'Aircraft heading to base',
  //   ),
  // );
  // return {
  //   sections: [],
  //   possibleClusters: [
  //     generateCluster([
  //       lpdHelper.generateListWidget(
  //         lpdHelper.generateBaseWidget(
  //           uuid(),
  //           'tinder',
  //           500,
  //           500,
  //           LIST_WIDGET_WIDTH,
  //           LIST_WIDGET_HEIGHT,
  //           '/pearce-screen',
  //           false,
  //           true,
  //           1,
  //           [...elements],
  //           ['message'],
  //         ),
  //       ),
  //     ]),
  //   ],
  // };
  return {
    sections: [],
    possibleClusters: [],
  };
};

const generateCluster = (widgets: Widget[]): WidgetCluster => ({
  widgets: widgets,
});

// Map each message type to its corresponding LPD function
const mediumLPDMessageFunctions: any = {
  ThreatDetected: threatDetectedMessageMedium,
  RequestApprovalToAttack: requestApprovalToAttackMessageMedium,
  AcaFuelLow: acaFuelLowMessageMedium,
  AcaDefect: acaDefectMessageMedium,
  AcaHeadingToBase: acaHeadingToBaseMessageMedium,
  MissileToOwnshipDetected: missileToOwnshipDetectedMessageMedium,
};

const mediumLPD = (message: Message) => {
  if (message.priority !== -1)
    //if the message is a real message, return the clusters
    return mediumLPDMessageFunctions[message.kind](message);

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
    'ThreatDetected',
  ];

  //get all widgets as list of widgets instead of list of clusters
  let allPossibleWidgets: any = [];
  messageKinds.forEach((kind) => {
    //for each message kind
    mediumLPDMessageFunctions[kind](tempMessage).possibleClusters.forEach(
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

export default mediumLPD;
