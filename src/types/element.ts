import type { Modality } from 'src/types/modality';
import type { Properties } from 'csstype';

export type BaseElement = {
  id: string;
  modality: Modality;

  h: number;
  w: number;
  xWidget: number;
  yWidget: number;

  priority?: number;
  collapsed?: boolean;

  // could this be made more strict?
  messageData?: string;

  expirationInterval?: number;
  expiration?: string;
  onExpiration?: 'delete' | 'escalate' | 'deescalate';
  interacted?: boolean;
  canOverlap?: boolean;
  style?: Properties;
};

export type TableElement = BaseElement & {
  type: 'table';
  rows: number;
  cols: number;
  tableData: string[][];
};

export type ButtonElement = BaseElement & {
  type: 'button';
  onClick?: () => void;
  text: string;
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

export type Element =
  | TableElement
  | ButtonElement
  | TextElement
  | ImageElement
  | AudioElement
  | IconElement;
