import type { Element } from 'src/types/element';

type WidgetType =
  | 'tinder'
  | 'message'
  | 'highWarning'
  | 'lowWarning'
  | 'request';

export type Widget = {
  elements: Element[];
  id: string;
  type: WidgetType;

  x: number;
  y: number;
  w: number;
  h: number;

  padding: number;

  canOverlap: boolean;
  useElementLocation: boolean;
  maxElements: number;
};

/* export type BaseWidget<TType extends string, TData extends object> = {
  id: string;
  x: number;
  y: number;
  type: TType;

  element: Element[];
  canOverlap: boolean;
  useElementLocation: boolean;
  maxAmount: number; // what does this refer to?

  data: TData;
};

export type MessageWidget = BaseWidget<
  'message',
  {
    // additional properties
  }
>;

export type HighWarningWidget = BaseWidget<
  'highWarning',
  {
    // additional properties here
  }
>;

export type LowWarningWidget = BaseWidget<
  'lowWarning',
  {
    // additional properties here
  }
>;

export type RequestWidget = BaseWidget<
  'request',
  {
    // additional properties here
  }
>;

export type Widget =
  | MessageWidget
  | HighWarningWidget
  | LowWarningWidget
  | RequestWidget;

  */
