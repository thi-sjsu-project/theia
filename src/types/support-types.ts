export type Cell = {
  widgetIDs: string[];
  priority: number;
  type: 'free' | 'tinder' | 'message';
  color?: string;
};

export type Section = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  priority: number;
  type:
    | 'free'
    | 'tinder'
    | 'message'
    | 'highWarning'
    | 'lowWarning'
    | 'request';
  widgetIDs: string[];
};

export type LinkedSectionWidget = {
  widgetID: string;
  sectionID: string;
};

export type Position = {
  x: number;
  y: number;
};
