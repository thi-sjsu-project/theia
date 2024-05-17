import type {
  Message,
  MissileToOwnshipDetected,
  RequestApprovalToAttack,
} from 'src/types/schema-types';
import lpdHelper from 'src/utils/lpdHelper';
import { v4 as uuid } from 'uuid';
import DANGER_ICON from 'src/assets/icons/danger.svg';
import { type Widget } from 'src/types/widget';
import type { WidgetCluster } from 'src/types/support-types';
import type { Element } from 'src/types/element';

// Functions to create widgets, elements, and sections for each message type
const requestApprovalToAttackMessageMedium = (
  message: RequestApprovalToAttack,
) => {
  const elements: Element[] = [];
  elements.push(
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
            false,
            1,
            [...elements],
          ),
        ),
      ]),
    ],
  };
};

const acaFuelLowMessageMedium = (message: Message) => {
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

const missileToOwnshipDetectedMessageMedium = (
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

const acaDefectMessageMedium = (message: Message) => {
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

const acaHeadingToBaseMessageMedium = (message: Message) => {
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
const mediumLPDMessageFunctions: any = {
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
