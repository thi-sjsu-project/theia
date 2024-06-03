import type { Element } from 'src/types/element';
import type { Properties } from 'csstype';
import type { Screen, SectionType } from 'src/types/support-types';

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
  maxAmount?: number;

  handledMessageIds?: string[];

  padding?: number;
  priority?: number;
  style?: Properties;

  tags?: string[];
};

// widget without any bells and whistles when you really only want to place some static stuff
export type BasicWidget = BaseWidget & {
  type: 'basic';
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

export type AcaHeaderWidget = BaseWidget & {
  type: 'aca-header';
};

export type PearceHeaderWidget = BaseWidget & {
  type: 'pearce-header';
};

export type CustomWidget = BaseWidget & {
  type: 'custom';
  // additonal properties...
};

export type EscalationModeWidget = BaseWidget & {
  type: 'escalation';
  // additional properties...
};

export type VideoWidget = BaseWidget & {
  type: 'video-footage';
};

export type LeftCornerMapWidget = BaseWidget & {
  type: 'left-corner-map';
};

export type Widget =
  | CustomWidget
  | VehicleWidget
  | BasicWidget
  | ListWidget
  | GridWidget
  | HistoryWidget
  | AcaHeaderWidget
  | PearceHeaderWidget
  | MapWarningWidget
  | EscalationModeWidget
  | LeftCornerMapWidget
  | VideoWidget;

export type WidgetMap = { [key: string]: Widget };
