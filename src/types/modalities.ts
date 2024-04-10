/* MODIFY AS REQUIRED */

export type Modality =
  | 'visual'
  | 'auditory'
  | 'tactile'
  | 'olfactory'
  | 'gustatory';

export type Element = {
  expirationInterval?: number;
  expiration?: string;
  onExpiration?: 'delete' | 'escalate' | 'deescalate';
  interacted?: boolean;
  id: string;
  modality: Modality;
  type: 'table' | 'button' | 'text' | 'image' | 'audio' | 'icon';
  locationWidget: [number[], number[]];
  canOverlap: boolean;
};

export type Widget = {
  elements: Element[];
  id: string;
  type: string;
  maxAmount: number;
  size: number[];
  locationGrid: [number[], number[]];
  useElementLocation: boolean;
  canOverlap: boolean;
};
