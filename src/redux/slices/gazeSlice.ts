import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type ElementInGaze = {
  id: string;
  widgetId: string;
  timeEnteredGaze: string;
};

type InitialState = {
  elementsInGaze: ElementInGaze[];
};

const initialState: InitialState = {
  elementsInGaze: [],
};

export const gazeSlice = createSlice({
  name: 'gaze',
  initialState,
  reducers: {
    // add state updating functions here)
    setElementsInGaze: (state, action:PayloadAction<ElementInGaze[]>) => {
      const elements = action.payload; //elements (or lack of) that are now in view after the BM moved their eyes
      const elementIds = elements.map(e => e.id); //holds the ids for elements that are in the BM's gaze
      const oldElements = [...state.elementsInGaze]; //elements that were in gaze
      const elementsInGaze:ElementInGaze[] = []; //new set of elements in gaze
      const elementsInGazeIds:string[] = []; //ids of elements that were previously in gaze and still are
      oldElements.forEach(function(oldElement, oldElementIndex){ //find the elements that were previously in gaze and still are. effectively removes the elements that are no longer in gaze.
        if(elementIds.includes(oldElement.id)){ //the element is still in gaze, add it
          elementsInGaze.push(oldElement);
          elementsInGazeIds.push(oldElement.id);
        }
      });

      elements.forEach(function(element, elementIdIndex){ //find if elements aren't in the state yet, and add them if they are not in state
        if (!elementsInGazeIds.includes(element.id)){ //element is not in the state yet, so add it
          elementsInGaze.push(element);
        }
      });

      state.elementsInGaze = elementsInGaze;//set the new elements in gaze

    },
  },
  selectors: {
    // add selector functions here (to get state values from the store)
    getElementsInGaze: (state) => state.elementsInGaze,
  },
});

export const { setElementsInGaze } = gazeSlice.actions;

export const { getElementsInGaze } = gazeSlice.selectors;
