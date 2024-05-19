import type {
  Message,
  MissileToOwnshipDetected,
  RequestApprovalToAttack,
} from 'src/types/schema-types';
import lpdHelper from 'src/utils/lpdHelper';
import { v4 as uuid } from 'uuid';
import type {
  Element,
  IconElement,
  InformationElement,
} from 'src/types/element';
import DANGER_ICON from 'src/assets/icons/danger.svg';
import type { MapWarningWidget, Widget } from 'src/types/widget';
import type { WidgetCluster } from 'src/types/support-types';
import { mapTargetTypeToWarningIcon } from 'src/prototype/utils/helpers';

// Functions to create widgets, elements, and sections for each message type
const requestApprovalToAttackMessageLow = (
  message: RequestApprovalToAttack,
) => {
  const pearceScreenElements = [
    lpdHelper.generateRequestApprovalElement(
      lpdHelper.generateBaseElement(uuid(), 'visual', 30, 30, message.priority),
      message,
      lpdHelper.generateIconElement(
        lpdHelper.generateBaseElement(uuid(), 'visual', 80, 80),
        DANGER_ICON,
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
      h: 50,
      w: 50,
      widgetId: minimapWidgetId1,
      src: mapTargetTypeToWarningIcon(message.data.target.type),
      expirationInterval: 3000,
      onExpiration: 'escalate',
    } satisfies IconElement,
    {
      id: uuid(),
      modality: 'visual',
      type: 'information',
      h: 70,
      w: 150,
      message,
      size: 'L', // size L when stress is low
      collapsed: true, // initially, the information elemnt is not displayed
      expirationInterval: 3000,
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
      w: 50,
      h: 50,
      screen: '/minimap',
      canOverlap: true,
      useElementLocation: false,
      maxAmount: 10,

      elements: minimapElements,
    } satisfies MapWarningWidget,
  ];

  return {
    sections: [],
    possibleClusters: [
      generateCluster([
        lpdHelper.generateListWidget(
          lpdHelper.generateBaseWidget(
            uuid(),
            'tinder',
            100,
            100,
            300,
            800,
            '/pearce-screen',
            false,
            false,
            1,
            [...pearceScreenElements],
          ),
        ),
        ...minimapWidgets,
      ]),
    ],
  };
};

const acaFuelLowMessageLow = (message: Message) => {
  const elements: Element[] = [];
  elements.push(
    lpdHelper.generateTableElement(
      lpdHelper.generateBaseElement(
        uuid(),
        'visual',
        50,
        200,
        message.priority,
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
            300,
            800,
            '/pearce-screen',
            false,
            false,
            1,
            [...elements],
          ),
        ),
      ]),
    ],
  };
};

const missileToOwnshipDetectedMessageLow = (
  message: MissileToOwnshipDetected,
) => {
  const elementId = uuid();

  const minimapWidgetId1 = uuid();
  const minimapElements: Element[] = [
    {
      id: uuid(),
      modality: 'visual',
      type: 'icon',
      h: 50,
      w: 50,
      widgetId: minimapWidgetId1,
      src: mapTargetTypeToWarningIcon('missile'),
    } satisfies IconElement,
    {
      id: uuid(),
      modality: 'visual',
      type: 'information',
      h: 70,
      w: 150,
      message,
      size: 'L', // size L when stress is low
      collapsed: true, // initially, the information elemnt is not displayed
      expirationInterval: 3000,
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
      w: 50,
      h: 50,
      screen: '/minimap',
      canOverlap: true,
      useElementLocation: false,
      maxAmount: 10,

      elements: minimapElements,
    } satisfies MapWarningWidget,
  ];

  const pearceScreenElements: Element[] = [
    lpdHelper.generateMissileIncomingElement(
      lpdHelper.generateBaseElement(
        elementId,
        'visual',
        50,
        200,
        message.priority,
      ),
      message,
      lpdHelper.generateIconElement(
        lpdHelper.generateBaseElement(uuid(), 'visual', 80, 80),
        DANGER_ICON,
      ),
    ),
  ];

  return {
    sections: [],
    possibleClusters: [
      generateCluster([
        lpdHelper.generateListWidget(
          lpdHelper.generateBaseWidget(
            uuid(),
            'tinder',
            100,
            100,
            300,
            800,
            '/pearce-screen',
            false,
            true,
            1,
            [...pearceScreenElements],
          ),
        ),
        ...minimapWidgets,
      ]),
    ],
  };
};

const acaDefectMessageLow = (message: Message) => {
  const elements: Element[] = [];
  elements.push(
    lpdHelper.generateTableElement(
      lpdHelper.generateBaseElement(
        uuid(),
        'visual',
        50,
        200,
        message.priority,
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
            'tinder',
            500,
            500,
            300,
            800,
            '/pearce-screen',
            false,
            true,
            1,
            [...elements],
          ),
        ),
      ]),
    ],
  };
};

const acaHeadingToBaseMessageLow = (message: Message) => {
  const elements: Element[] = [];
  elements.push(
    lpdHelper.generateTextElement(
      lpdHelper.generateBaseElement(
        uuid(),
        'visual',
        30,
        200,
        message.priority,
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
            300,
            800,
            '/pearce-screen',
            false,
            true,
            1,
            [...elements],
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
const lowLPDMessageFunctions: any = {
  RequestApprovalToAttack: requestApprovalToAttackMessageLow,
  AcaFuelLow: acaFuelLowMessageLow,
  AcaDefect: acaDefectMessageLow,
  AcaHeadingToBase: acaHeadingToBaseMessageLow,
  MissileToOwnshipDetected: missileToOwnshipDetectedMessageLow,
};

const lowLPD = (message: Message) => {
  if (message.priority !== -1)
    //if the message is a real message, return the clusters
    return lowLPDMessageFunctions[message.kind](message);

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
    lowLPDMessageFunctions[kind](tempMessage).possibleClusters.forEach(
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

export default lowLPD;
