import type { Modality } from 'src/types/modality';

export type BaseElement = {
  id: string;
  modality: Modality;

  h: number;
  w: number;
  xWidget: number;
  yWidget: number;

  expirationInterval?: number;
  expiration?: string;
  onExpiration?: 'delete' | 'escalate' | 'deescalate';
  interacted?: boolean;
  canOverlap?: boolean;
};

export type TableElement = BaseElement & {
  type: 'table';
  rows: number;
  cols: number;
  data: string[][];
};

export type ButtonElement = BaseElement & {
  type: 'button';

  // example additional properties
  onClick: () => void;
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

  // additional properties here
};

export type Element =
  | TableElement
  | ButtonElement
  | TextElement
  | ImageElement
  | AudioElement
  | IconElement;