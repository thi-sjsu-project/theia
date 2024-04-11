export type Cell = {
  widgetIDs: string[];
  priority: number;
  type: 'free' | 'tinder' | 'message';
  color?: string;
};

export type Section = {
  x: number;
  y: number;
  w: number;
  h: number;
  priority: number;
  type: 'free' | 'tinder' | 'message';

}
