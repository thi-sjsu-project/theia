/* MODIFY AS REQUIRED */

export type Modality =
  | 'visual'
  | 'auditory'
  | 'tactile'
  | 'olfactory'
  | 'gustatory';

export type Element = {
  expiration: string;
  id: string;
  modality: Modality;
  type: 'table' | 'button' | 'text' | 'image' | 'audio' | 'icon';
};

export type Widget = {
  elements: Element[];
  id: string;
  name?: string; // optional field...?
};
