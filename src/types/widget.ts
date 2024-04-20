export type BaseWidget = {
  element: Element[];
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  canOverlap: boolean;
  useElementLocation: boolean;
  maxAmount: number; // what does this refer to?
};

export type MessageWidget = BaseWidget & {
  type: 'message';
  /** additional properties here */
};

export type HighWarningWidget = BaseWidget & {
  type: 'highWarning';
  /** additional properties here */
};

export type LowWarningWidget = BaseWidget & {
  type: 'lowWarning';
  /** additional properties here */
};

export type RequestWidget = BaseWidget & {
  type: 'request';
  /** additional properties here */
};

export type Widget =
  | MessageWidget
  | HighWarningWidget
  | LowWarningWidget
  | RequestWidget;
