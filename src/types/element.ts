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
  /** additional properties here */
};

export type ButtonElement = BaseElement & {
  type: 'button';
  /** additional properties here */
};

export type TextElement = BaseElement & {
  type: 'text';
  /** additional properties here */
};

export type ImageElement = BaseElement & {
  type: 'image';
  /** additional properties here */
};

export type AudioElement = BaseElement & {
  type: 'audio';
  /** additional properties here */
};

export type IconElement = BaseElement & {
  type: 'icon';
  /** additional properties here */
};

export type Element =
  | TableElement
  | ButtonElement
  | TextElement
  | ImageElement
  | AudioElement
  | IconElement;
