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

  // simulation LPD
  if (message.kind === 'RequestApprovalToAttack') {
    possibleModalities.push({
      id: uuid(),
      expiration: new Date().toISOString(),
      modality: 'visual',
      type: 'button',
    });
  } else if (message.kind === 'MissileToOwnshipDetected') {
    possibleModalities.push({
      id: uuid(),
      expiration: new Date().toISOString(),
      modality: 'auditory',
      type: 'audio',
    });
    possibleModalities.push({
      id: uuid(),
      expiration: new Date().toISOString(),
      modality: 'visual',
      type: 'icon',
    });
  } else if (message.kind === 'AcaFuelLow' || message.kind === 'AcaDefect') {
    possibleModalities.push({
      id: uuid(),
      expiration: new Date().toISOString(),
      modality: 'visual',
      type: 'table',
    });
    possibleModalities.push({
      id: uuid(),
      expiration: new Date().toISOString(),
      modality: 'visual',
      type: 'text',
    });
  } else if (message.kind === 'AcaHeadingToBase') {
    possibleModalities.push({
      id: uuid(),
      expiration: new Date().toISOString(),
      modality: 'visual',
      type: 'text',
    });
  }

  return {
    message,
    possibleModalities,
  };
};

export default selector;
