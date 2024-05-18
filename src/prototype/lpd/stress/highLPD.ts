import type {
  Message,
  MissileToOwnshipDetected,
  RequestApprovalToAttack,
} from 'src/types/schema-types';
import { v4 as uuid } from 'uuid';
import lpdHelper from 'src/utils/lpdHelper';
import DANGER_ICON from 'src/assets/icons/danger.svg';
import type { Element, IconElement } from 'src/types/element';
import type { Widget, MapWarningWidget } from 'src/types/widget';
import type { WidgetCluster } from 'src/types/support-types';
import ThreatAirDefenseSmReg from 'src/assets/icons/threats/airdefense-sm-reg.svg';

// Functions to create widgets, elements, and sections for each message type
const requestApprovalToAttackMessageHigh = (
  message: RequestApprovalToAttack,
) => {
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
      src: ThreatAirDefenseSmReg,
    } satisfies IconElement,
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
            'list',
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
            'list',
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

const missileToOwnshipDetectedMessageHigh = (
  message: MissileToOwnshipDetected,
) => {
  const elements: Element[] = [];
  elements.push(
    lpdHelper.generateMissileIncomingElement(
      lpdHelper.generateBaseElement(
        uuid(),
        'visual',
        50,
        200,
        message.priority,
        'list',
      ),
      message,
      lpdHelper.generateIconElement(
        lpdHelper.generateBaseElement(uuid(), 'visual', 80, 80),
        DANGER_ICON,
      ),
    ),
  );
  return {
    sections: [],
    possibleClusters: [
      generateCluster([
        lpdHelper.generateListWidget(
          lpdHelper.generateBaseWidget(
            'list',
            'tinder',
            100,
            100,
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
            'list',
            'minimap',
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
            'list',
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
const highLPDMessageFunctions: any = {
  RequestApprovalToAttack: requestApprovalToAttackMessageHigh,
  AcaFuelLow: acaFuelLowMessageHigh,
  MissileToOwnshipDetected: missileToOwnshipDetectedMessageHigh,
  AcaDefect: acaDefectMessageHigh,
  AcaHeadingToBase: acaHeadingToBaseMessageHigh,
};

const highLPD = (message: Message) => {
  console.log('highLPD');
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
    },
  } as RequestApprovalToAttack;

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
