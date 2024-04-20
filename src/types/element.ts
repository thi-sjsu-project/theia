import type { Modality } from 'src/types/modality';

export type BaseElement<TType extends string, TData extends object> = {
  id: string;
  type: TType;
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

  typeData: TData;
};

export type TableElement = BaseElement<
  'table',
  {
    // example additional properties
    rows: number;
    cols: number;
    data: string[][];
  }
>;

export type ButtonElement = BaseElement<
  'button',
  {
    // example additional properties
    onClick: () => void;
  }
>;

export type TextElement = BaseElement<
  'text',
  {
    // additional properties here
    text: string;
  }
>;

export type ImageElement = BaseElement<
  'image',
  {
    // additional properties here
    src: string;
  }
>;

export type AudioElement = BaseElement<
  'audio',
  {
    // additional properties here
    intensity: number;
    frequency: number;
  }
>;

export type IconElement = BaseElement<
  'icon',
  {
    // additional properties here
  }
>;

export type Element =
  | TableElement
  | ButtonElement
  | TextElement
  | ImageElement
  | AudioElement
  | IconElement;
