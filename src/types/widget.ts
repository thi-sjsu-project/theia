import type { Element } from 'src/types/element';
import type { Properties } from 'csstype';
import type { ScreenType, SectionType } from 'src/types/support-types';

export type BaseWidget = {
  elements: Element[];
  id: string;
  sectionType: SectionType;

  x: number;
  y: number;
  w: number;
  h: number;

  screen: ScreenType;

  canOverlap: boolean;
  useElementLocation: boolean;
  maxAmount: number;

  padding?: number;
  priority?: number;
  style?: Properties;
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
  // additonal properties...
};

export type CustomWidget = BaseWidget & {
  type: 'custom';
  // additonal properties...
};

export type Widget = CustomWidget | VehicleWidget | ListWidget | GridWidget;

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
