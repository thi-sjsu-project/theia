import type { Message } from 'src/types/schema-types';
import { v4 as uuid } from 'uuid';
import type { Element, Widget } from 'src/types/modalities';

type SelectorProps = {
  message: Message;
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

  // simulation LPD
  if (message.kind === 'RequestApprovalToAttack') {
    const elements: Element[] = [{
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
      w:5, 
      canOverlap: false,
    }];

    const widget: Widget = {
      id: 'minimap',
      maxAmount: 1,
      x: 0,
      y: 0,
      h: 50,
      w: 50,
      type: 'request',
      useElementLocation: true,
      canOverlap: false,
      elements,
    };

    possibleWidgets.push(widget);
    //possibleWidgets.push({
    //  id: uuid(),
    //  expiration,
    //  modality: 'visual',
    //  type: 'button',
    //  onExpiration,
    //});
  } else if (message.kind === 'MissileToOwnshipDetected') {
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
    const elements: Element[] = [{
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
      w:5, 
      canOverlap: false,
    }];

    const widget: Widget = {
      id: 'minimap',
      maxAmount: 1,
      x: 0,
      y: 0,
      h: 50,
      w: 50,
      type: 'highWarning',
      useElementLocation: true,
      canOverlap: false,
      elements,
    };

    possibleWidgets.push(widget);
  } else if (message.kind === 'AcaFuelLow' || message.kind === 'AcaDefect') {
    //possibleWidgets.push({
    //  id: uuid(),
    //  expiration,
    //  modality: 'visual',
    //  type: 'table',
    //  onExpiration,
    //});
    const elements: Element[] = [{
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
      w:5, 
      canOverlap: true,
    }];

    const widget: Widget = {
      id: 'minimap',
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
  } else if (message.kind === 'AcaHeadingToBase') {
    //possibleWidgets.push({
    //  id: uuid(),
    //  expiration,
    //  modality: 'visual',
    //  type: 'text',
    //  onExpiration,
    //});
    const elements: Element[] = [{
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
      w:5, 
      canOverlap: true,
    }];

    const widget: Widget = {
      id: 'minimap',
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
  }

  return {
    message,
    possibleWidgets,
  };
};

export default selector;

