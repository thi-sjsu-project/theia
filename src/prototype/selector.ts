import type { Message } from 'src/types/schema-types';
import { v4 as uuid } from 'uuid';
import type { Widget } from 'src/types/widget';
import type {
  Element,
  ButtonElement,
  IconElement,
  TextElement,
  TableElement,
} from 'src/types/element';

type SelectorProps = {
  message: Message; //Message;
};

/**
 * @description ???
 * @param ???
 * @returns ???
 */
const selector = ({ message }: SelectorProps) => {
  const possibleWidgets: Widget[] = [];

  const expirationTime = new Date();
  expirationTime.setSeconds(
    expirationTime.getSeconds() + (Math.floor(Math.random() * 10) + 5),
  ); //set the time to expire to a time between 5 and 15 seconds

  const expiration = expirationTime.toISOString();

  const onExpiration = 'delete';

  // Only doing a single widget for Demo3
  const widget: Widget = {
    // static ID for Demo3
    id: 'tinder',
    type: 'tinder',
    elements: [],
    x: 50,
    y: 40,
    w: 300,
    h: 800,
    canOverlap: false,
    useElementLocation: false,
    maxAmount: 1,
  };

  let elements: Element[] = [];

  switch (message.kind) {
    case 'RequestApprovalToAttack':
      elements.push({
        id: uuid(),
        type: 'button',
        modality: 'visual',
        xWidget: 0,
        yWidget: 0,
        h: 50,
        w: 80,
        text: 'Approve',
        priority: message.priority,
      } satisfies ButtonElement);
      break;

    case 'MissileToOwnshipDetected':
      elements.push({
        id: uuid(),
        type: 'icon',
        modality: 'visual',
        xWidget: 0,
        yWidget: 0,
        h: 80,
        w: 80,
        src: '',
        tag: 'warning',
        priority: message.priority,
      } satisfies IconElement);
      break;

    case 'AcaHeadingToBase':
      elements.push({
        id: uuid(),
        type: 'text',
        modality: 'visual',
        xWidget: 0,
        yWidget: 0,
        h: 30,
        w: 200,
        text: 'Aircraft heading to base',
        priority: message.priority,
      } satisfies TextElement);
      break;

    case 'AcaFuelLow':
      elements.push({
        id: uuid(),
        type: 'table',
        modality: 'visual',
        xWidget: 0,
        yWidget: 0,
        h: 50,
        w: 200,
        rows: 2,
        cols: 2,
        tableData: [
          ['Fuel', 'Low'],
          ['Altitude', 'Low'],
        ],
        priority: message.priority,
      } satisfies TableElement);
      break;

    case 'AcaDefect':
      elements.push({
        id: uuid(),
        type: 'table',
        modality: 'visual',
        xWidget: 0,
        yWidget: 0,
        h: 50,
        w: 200,
        rows: 2,
        cols: 2,
        tableData: [
          ['Defect', 'Engine'],
          ['Altitude', 'Low'],
        ],
        priority: message.priority,
      } satisfies TableElement);
      break;
  }

  widget.elements = elements;

  return {
    message,
    possibleWidgets: [widget],
  };

  // simulation LPD
  /* if (message === 'RequestApprovalToAttack') {
    const elements: Element[] = [
      {
        expirationInterval: 5,
        expiration: 'Yes',
        onExpiration: 'escalate',
        interacted: false,
        id: uuid(),
        modality: 'visual',
        type: 'button',
        xWidget: 0,
        yWidget: 0,
        h: 5,
        w: 5,
        canOverlap: false,
      },
    ];

    const widget: Widget = {
      id: 'request',
      x: 0,
      y: 0,
      h: 80,
      w: 140,
      type: 'request',
      useElementLocation: true,
      canOverlap: false,
      elements,
      maxAmount: 1,
    };

    possibleWidgets.push(widget);
    //possibleWidgets.push({
    //  id: uuid(),
    //  expiration,
    //  modality: 'visual',
    //  type: 'button',
    //  onExpiration,
    //});
  } else if (message === 'MissileToOwnshipDetected') {
    // possibleModalities.push({
    //   id: uuid(),
    //   expiration,
    //   modality: 'auditory',
    //   type: 'audio',
    //   onExpiration,
    // });
    //possibleWidgets.push({
    //  id: uuid(),
    //  expiration,
    //  modality: 'visual',
    //  type: 'icon',
    //  onExpiration,
    //});
    const elements: Element[] = [
      {
        expirationInterval: 5,
        expiration: 'Yes',
        onExpiration: 'escalate',
        interacted: false,
        id: uuid(),
        modality: 'visual',
        type: 'icon',
        xWidget: 0,
        yWidget: 0,
        h: 5,
        w: 5,
        canOverlap: false,
        src: '',
      },
    ];

    const widget: Widget = {
      id: 'highWarning',
      maxAmount: 1,
      x: 0,
      y: 0,
      h: 200,
      w: 400,
      type: 'highWarning',
      useElementLocation: true,
      canOverlap: false,
      elements,
    };

    possibleWidgets.push(widget);
  } else if (message === 'AcaFuelLow' || message === 'AcaDefect') {
    //possibleWidgets.push({
    //  id: uuid(),
    //  expiration,
    //  modality: 'visual',
    //  type: 'table',
    //  onExpiration,
    //});
    const elements: Element[] = [
      {
        expirationInterval: 5,
        expiration: 'Yes',
        onExpiration: 'delete',
        interacted: false,
        id: uuid(),
        modality: 'visual',
        type: 'table',
        xWidget: 0,
        yWidget: 0,
        h: 5,
        w: 5,
        canOverlap: true,
        rows: 3,
        cols: 3,
        data: [],
      },
    ];

    const widget: Widget = {
      id: 'lowWarning',
      maxAmount: 1,
      x: 0,
      y: 0,
      h: 50,
      w: 50,
      type: 'lowWarning',
      useElementLocation: true,
      canOverlap: false,
      elements,
    };

    possibleWidgets.push(widget);
    // possibleModalities.push({
    //   id: uuid(),
    //   expiration,
    //   modality: 'visual',
    //   type: 'text',
    //   onExpiration,
    // });
  } else if (message === 'AcaHeadingToBase') {
    //possibleWidgets.push({
    //  id: uuid(),
    //  expiration,
    //  modality: 'visual',
    //  type: 'text',
    //  onExpiration,
    //});
    const elements: Element[] = [
      {
        expirationInterval: 5,
        expiration: 'Yes',
        onExpiration: 'escalate',
        interacted: false,
        id: uuid(),
        modality: 'visual',
        type: 'text',
        xWidget: 0,
        yWidget: 0,
        h: 5,
        w: 5,
        canOverlap: true,
        text: `Aircraft heading to base`,
      },
    ];

    const widget: Widget = {
      id: 'message',
      maxAmount: 1,
      x: 0,
      y: 0,
      h: 50,
      w: 50,
      type: 'message',
      useElementLocation: true,
      canOverlap: false,
      elements,
    };

    possibleWidgets.push(widget);
  } else if (message === 'tinder') {
    const topHalf: Element = {
      id: 'topHalf',
      modality: 'visual',
      type: 'text',
      xWidget: 10,
      yWidget: 0,
      w: 100,
      h: 100,
      text: 'Swipe right to launch missile',
    };
    const widget: Widget = {
      id: uuid(),
      elements: [topHalf],
      type: 'tinder',
      maxAmount: 1,
      x: 150,
      y: 200,
      w: 160,
      h: 300,
      useElementLocation: false,
      canOverlap: false,
    };

    possibleWidgets.push(widget);
  } */
};

export default selector;
