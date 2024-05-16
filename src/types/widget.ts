import type { Element } from 'src/types/element';
import type { Properties } from 'csstype';
import type { Screen, SectionType } from 'src/types/support-types';

export type TagsType =
  | ['ownship']
  | ['drone']
  | ['target']
  | ['enemy']
  | ['warning']
  | ['message']
  | string[];

export type BaseWidget = {
  elements: Element[];
  id: string;
  sectionType: SectionType;

  x: number;
  y: number;
  w: number;
  h: number;

  screen: Screen;

  canOverlap: boolean;
  useElementLocation: boolean;
  maxAmount: number;

  padding?: number;
  priority?: number;
  style?: Properties;
  tags?: TagsType;
};

export type ListWidget = BaseWidget & {
  type: 'list';
  maxElements?: number;
};

export type GridWidget = BaseWidget & {
  type: 'grid';
  rows: number;
  cols: number;
};

export type VehicleWidget = BaseWidget & {
  type: 'vehicle';
  // this corresponds to the id in the schema-types defined by the world-sim team
  vehicleId: number;
  speed: number;
  rotation: number; // rad
};

export type MapWarningWidget = BaseWidget & {
  type: 'map-warning';
};

export type HistoryWidget = BaseWidget & {
  type: 'history';
};

export type CustomWidget = BaseWidget & {
  type: 'custom';
  // additonal properties...
};

export type Widget =
  | CustomWidget
  | VehicleWidget
  | ListWidget
  | GridWidget
  | HistoryWidget
  | MapWarningWidget;

export type WidgetMap = { [key: string]: Widget };

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
