import type { Modality } from 'src/types/modality';
import type {
  MissileToOwnshipDetected,
  RequestApprovalToAttack,
  ThreatDetected,
} from 'src/types/schema-types';
import type { Properties } from 'csstype';
import type { Id, Range, Message } from 'src/types/schema-types';
import { type SortTypes } from './sortMethod';

export type BaseElement = {
  id: string;
  modality: Modality;

  h: number;
  w: number;

  widgetId?: string;

  priority?: number;
  collapsed?: boolean;

  expirationIntervalMs?: number; // should be in ms
  expiration?: string;
  onExpiration?: 'delete' | 'escalate' | 'deescalate';
  escalate?: boolean;
  deescalate?: boolean;

  interacted?: boolean;
  canOverlap?: boolean;
  style?: Properties;
};

//
// ~~~~~~~ Simple Elements ~~~~~~~~~
//
export type ButtonElement = BaseElement & {
  type: 'button';
  onClick?: () => void;
  text: string;
};

export type TableElement = BaseElement & {
  type: 'table';
  rows?: number;
  cols?: number;
  tableData: string[][];
};

export type TextElement = BaseElement & {
  type: 'text';

  // additional properties here
  text: string;
};

export type ImageElement = BaseElement & {
  type: 'image';

  // additional properties here
  src: string;
};

export type AudioElement = BaseElement & {
  type: 'audio';

  // additional properties here
  intensity: number;
  frequency: number;
};

export type IconElement = BaseElement & {
  type: 'icon';
  src: string;
  // makes search easier
  tag?: string;
};

//
// ~~~~~~~ Complex Elements ~~~~~~~~~
//
export type CustomElement = BaseElement & {
  type: 'custom';
};

export type RequestApprovalElement = BaseElement & {
  type: 'request-approval';
  messageType: 'RequestApprovalToAttack';
  messageId: string;
  conversationId: string;
  icon: IconElement;
  widgetId: string;
};

export type ThreatDetectedElement = BaseElement & {
  type: 'threat-detected';
  messageType: 'ThreatDetected';
  messageId: string;
  conversationId: string;
  icon: IconElement;
  widgetId: string;
};

export type MissileIncomingElement = BaseElement & {
  type: 'missile-incoming';
  messageId: string;
  conversationId: string;
  icon: IconElement;
  widgetId: string;
};

export type AcaStatusElement = BaseElement & {
  type: 'aca-status';
  acaId: Id;
  fuelLevel: Range<0, 1>;
  weaponLoad1: Range<0, 1>;
  weaponLoad2: Range<0, 1>;
  widgetId: string;
  isDead: boolean;
  messages: Array<AcaMessageElement>;
};

export type AcaMessageElement = BaseElement & {
  type: 'aca-message';
  statusElementId: string;
  text: string;
  show?: boolean;
};

export type InformationElement = BaseElement & {
  type: 'information';
  size: 'S' | 'M' | 'L';
  title?: string;
  message: RequestApprovalToAttack | MissileToOwnshipDetected | ThreatDetected;
  widgetId: string;
};

export type SortElement = BaseElement & {
  type: 'sort';
  sortType: SortTypes;
  active: boolean;
};

// Simple elements have no nested elements and no children
export type SimpleElement =
  | TableElement
  | ButtonElement
  | TextElement
  | ImageElement
  | AudioElement
  | IconElement;

// Complex elements may have nested elements and children
export type ComplexElement =
  | MissileIncomingElement
  | RequestApprovalElement
  | ThreatDetectedElement
  | CustomElement
  | SortElement
  | InformationElement
  | AcaStatusElement
  | AcaMessageElement;

export type Element = SimpleElement | ComplexElement;

export type ElementMap = {
  [key: string]: Element;
};
