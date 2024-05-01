import type { Element } from 'src/types/element';
import type { Properties } from 'csstype';

export type WidgetType =
  | 'message'
  | 'highWarning'
  | 'lowWarning'
  | 'request'
  | 'vehicle';

export type Widget = {
  elements: Element[];
  id: string;
  type: WidgetType;

  x: number;
  y: number;
  w: number;
  h: number;

  canOverlap: boolean;
  useElementLocation: boolean;
  maxAmount: number;

  padding?: number;
  priority?: number;
  style?: Properties;
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
