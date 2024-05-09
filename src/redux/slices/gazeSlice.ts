import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type ElementInGaze = {
  id: string;
  widgetId: string;
  timeEnteredGaze: string;
};

export type ElementInGazeMap = {
  [key: string]: ElementInGaze;
};

export type GazeAndKey = {
  keyPress: string;
  elemsInGaze: ElementInGaze[];
  timeEnteredGaze: string;
};

type InitialState = {
  elementsInGaze: ElementInGaze[];
  gazesAndKeys: GazeAndKey[];
};

const initialState: InitialState = {
  elementsInGaze: [],
  gazesAndKeys: [],
};

export const gazeSlice = createSlice({
  name: 'gaze',
  initialState,
  reducers: {
    // add state updating functions here)
    setElementsInGaze: (state, action: PayloadAction<ElementInGaze[]>) => {
      state.elementsInGaze = action.payload;
    },
    addKeyDown: (state, action: PayloadAction<GazeAndKey>) => {
      state.gazesAndKeys.push(action.payload);
      // state = { //add the key press
      //   ...state,
      //   gazesAndKeys: [
      //     ...state.gazesAndKeys,
      //     {elemsInGaze: action.payload.elemsInGaze,
      //       keyPress: action.payload.keyPress
      //     }
      //   ]
      // }
    },
    removeKeyDown: (state, action: PayloadAction<string>) => {
      state.gazesAndKeys.map(function (gazeAndKey, gazeAndKeyIndex) {
        //console.log('equality toAdd: '+action.payload+' inStorage: '+gazeAndKey.keyPress)
        if (action.payload === gazeAndKey.keyPress) {
          //we found the key that was released
          state.gazesAndKeys = [
            ...state.gazesAndKeys.slice(0, gazeAndKeyIndex),
            ...state.gazesAndKeys.slice(gazeAndKeyIndex + 1),
          ];
          // state = { //remove the key
          //   ...state,
          //   gazesAndKeys: [
          //     ...state.gazesAndKeys.slice(0, gazeAndKeyIndex),
          //     ...state.gazesAndKeys.slice(gazeAndKeyIndex+1)
          //   ]
          // }
        }
      });
    },
  },

  selectors: {
    // add selector functions here (to get state values from the store)
    getElementsInGaze: (state) => state.elementsInGaze,
    getGazesAndKeys: (state) => state.gazesAndKeys,
  },
});

export const { setElementsInGaze, addKeyDown, removeKeyDown } =
  gazeSlice.actions;

export const { getElementsInGaze, getGazesAndKeys } = gazeSlice.selectors;
