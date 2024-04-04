import { Widget } from "src/types/modalities";

type RestrainerProps = {
  // define expected input here and it's type (number, string, etc.)
  visualComplexity: number;
  audioComplexity: number;
  widgets: {[key: string]: Widget};
  // add more as needed
};

type ModalityMeasureRange = {
  min: number;
  max: number;
};

type ModalityMeasureBoundary = {
  min: number;
  max: number;
};

type ModalityMeasure = {
  // for now it only takes into account how many visual and audio modalities are used
  /**
   * or use array instead of number and use objects with attributes such as volume, frequency
   * amount of audios playing at the same time for example can be seen by the amout of objects in the list
   */
  Visual: number;
  Audio: number;
  range: ModalityMeasureRange;
  boundary: ModalityMeasureBoundary;
};



/**
 * @description ???
 * @param ???
 * @returns ???
 */
const useRestrainer = ({ visualComplexity }: RestrainerProps) => {};

export default useRestrainer;
