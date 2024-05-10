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
  type: Modality;
  measure?: number;
  range: ModalityMeasureRange;
  boundary: ModalityMeasureBoundary;
};