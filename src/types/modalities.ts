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
  xWidget: number;
  yWidget: number;
  h: number;
  w: number;
  canOverlap?: boolean;
};

export type Widget = {
  elements: Element[];
  id: string;
  type: 'tinder' | 'message' | 'highWarning' | 'lowWarning' | 'request';
  maxAmount: number;
  x: number;
  y: number;
  w: number;
  h: number;
  useElementLocation: boolean;
  canOverlap: boolean;
};
