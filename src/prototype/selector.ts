import type { Message } from 'src/types/schema-types';
import { v4 as uuid } from 'uuid';
import type { Element } from 'src/types/modalities';

type SelectorProps = {
  message: Message;
};

/**
 * @description ???
 * @param ???
 * @returns ???
 */
const selector = ({ message }: SelectorProps) => {
  const possibleModalities: Element[] = [];

  const expirationTime = new Date();
  expirationTime.setSeconds(
    expirationTime.getSeconds() + (Math.floor(Math.random() * 10) + 5),
  ); //set the time to expire to a time between 5 and 15 seconds

  const expiration = expirationTime.toISOString();

  const onExpiration = 'delete';

  // simulation LPD
  if (message.kind === 'RequestApprovalToAttack') {
    possibleModalities.push({
      id: uuid(),
      expiration,
      modality: 'visual',
      type: 'button',
      onExpiration,
    });
  } else if (message.kind === 'MissileToOwnshipDetected') {
    // possibleModalities.push({
    //   id: uuid(),
    //   expiration,
    //   modality: 'auditory',
    //   type: 'audio',
    //   onExpiration,
    // });
    possibleModalities.push({
      id: uuid(),
      expiration,
      modality: 'visual',
      type: 'icon',
      onExpiration,
    });
  } else if (message.kind === 'AcaFuelLow' || message.kind === 'AcaDefect') {
    possibleModalities.push({
      id: uuid(),
      expiration,
      modality: 'visual',
      type: 'table',
      onExpiration,
    });
    // possibleModalities.push({
    //   id: uuid(),
    //   expiration,
    //   modality: 'visual',
    //   type: 'text',
    //   onExpiration,
    // });
  } else if (message.kind === 'AcaHeadingToBase') {
    possibleModalities.push({
      id: uuid(),
      expiration,
      modality: 'visual',
      type: 'text',
      onExpiration,
    });
  }

  return {
    message,
    possibleModalities,
  };
};

export default selector;
