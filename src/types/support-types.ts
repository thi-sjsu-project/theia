import { type Widget } from 'src/types/widget';

export type Cell = {
  widgetIDs: string[];
  priority: number;
  type: 'free' | 'tinder' | 'message';
  color?: string;
};

export type Screen = '/pearce-screen' | '/minimap' | '/right-screen';

export type SectionType =
  | 'free'
  | 'top-bar'
  | 'minimap'
  | 'tinder'
  | 'history'
  | 'map-video';

export type Section = {
  id: string;
  screen: Screen;
  x: number;
  y: number;
  w: number;
  h: number;
  priority: number;
  type: SectionType;
  widgetIDs: string[];
};

// TODO: remove this type
export type LinkedSectionWidget = {
  widgetID: string;
  sectionID: string;
};

export type Position = {
  x: number;
  y: number;
};

export type WidgetCluster = {
  widgets: Widget[];
  sectionIds?: LinkedSectionWidget[];
  actions?: string[];
};

export type WidgetChannel = 'list-history';
