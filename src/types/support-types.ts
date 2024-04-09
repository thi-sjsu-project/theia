export type GridCell = {
  widgetIDs: string[];
  priority: number;
  type: 'free' | 'tinder' | 'message';
  color?: string;
};

// INITIAL IDEA...NOT FINALIZED
export type GridSection = {
  priority: number;
  type: 'free' | 'tinder' | 'message'; // ADD MORE...
  bounds: {
    x: number; // top-left x
    y: number; // top-left y
    width: number;
    height: number;
  };
  color?: string;
};
