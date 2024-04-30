import type { Modality } from 'src/types/modality';
import type { Properties } from 'csstype';

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
  style?: Properties;
};

export type IconElement = BaseElement & {
  type: 'icon';
  src: string;
};

export type TableElement = BaseElement & {
  type: 'table';
  rows: number;
  cols: number;
  data: string[][];
};

export type ButtonElement = BaseElement & {
  type: 'button';
  onClick: () => void;
};

export type TextElement = BaseElement & {
  type: 'text';
  text: string;
};

export type ImageElement = BaseElement & {
  type: 'image';
  src: string;
};

export type AudioElement = BaseElement & {
  type: 'audio';
  intensity: number;
  frequency: number;
};

export type Element =
  | TableElement
  | ButtonElement
  | TextElement
  | ImageElement
  | AudioElement
  | IconElement;
