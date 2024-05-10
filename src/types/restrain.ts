import { type Modality } from "./modality";

type ModalityMeasureRange = {
  min: number;
  max: number;
};

type ModalityMeasureBoundary = {
  min: number;
  max: number;
};

export type ModalityMeasure = {
  // for now it only takes into account how many visual and audio modalities are used
  /**
   * or use array instead of number and use objects with attributes such as volume, frequency
   * amount of audios playing at the same time for example can be seen by the amout of objects in the list
   */
  type: Modality;
  measure: number;
  range: ModalityMeasureRange;
  boundary: ModalityMeasureBoundary;
};