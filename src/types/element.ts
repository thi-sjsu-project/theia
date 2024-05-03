import { type ReactNode } from 'react';
import type { Modality } from 'src/types/modality';
import type {
  MissileToOwnshipDetected,
  RequestApprovalToAttack,
} from 'src/types/schema-types';

export type BaseElement = {
  id: string;
  modality: Modality;

  h: number;
  w: number;
  xWidget: number;
  yWidget: number;

  priority?: number;
  collapsed?: boolean;

  expirationInterval?: number;
  expiration?: string;
  onExpiration?: 'delete' | 'escalate' | 'deescalate';
  interacted?: boolean;
  canOverlap?: boolean;
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
  rows: number;
  cols: number;
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
  tag?: 'ownship' | 'drone' | 'target' | 'enemy' | 'warning' | 'message';
};

//
// ~~~~~~~ Complex Elements ~~~~~~~~~
//
export type CustomElement = BaseElement & {
  type: 'custom';
};

export type RequestApprovalElement = BaseElement & {
  type: 'request-approval';
  message: RequestApprovalToAttack;
  icon: IconElement;
  leftButton: ButtonElement;
  rightButton: ButtonElement;
  // children?: ReactNode;
};

export type MissileIncomingElement = BaseElement & {
  type: 'missile-incoming';
  message: MissileToOwnshipDetected;
  icon: IconElement;
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
  | CustomElement;

export type Element = SimpleElement | ComplexElement;
