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
      locationWidget: [[0],[0]],
      canOverlap: false,
    }];

    const widget: Widget = {
      id: 'minimap',
      maxAmount: 1,
      size: [10,10],
      type: 'visual',
      locationGrid: [[0,0],[0,0]],
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
      locationWidget: [[0],[0]],
      canOverlap: false,
    }];

    const widget: Widget = {
      id: 'minimap',
      maxAmount: 1,
      size: [50,50],
      type: 'visual',
      locationGrid: [[0,0],[0,0]],
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
      locationWidget: [[0],[0]],
      canOverlap: true,
    }];

    const widget: Widget = {
      id: 'minimap',
      maxAmount: 1,
      size: [5,5],
      type: 'visual',
      locationGrid: [[0,0],[0,0]],
      useElementLocation: true,
      canOverlap: true,
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
      locationWidget: [[0],[0]],
      canOverlap: true,
    }];

    const widget: Widget = {
      id: 'minimap',
      maxAmount: 1,
      size: [2,2],
      type: 'visual',
      locationGrid: [[0,0],[0,0]],
      useElementLocation: true,
      canOverlap: true,
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
