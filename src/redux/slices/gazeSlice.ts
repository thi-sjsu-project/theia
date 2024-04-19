import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  veryImportantValue: null;
};

const initialState: InitialState = {
  veryImportantValue: null,
};

export const gazeSlice = createSlice({
  name: 'gaze',
  initialState,
  reducers: {
    // add state updating functions here)
    veryImportantFunction: (state, action) => {
      state.veryImportantValue = action.payload;
    },
  },
  selectors: {
    // add selector functions here (to get state values from the store)
    getVeryImportantValue: (state) => state.veryImportantValue,
  },
});

export const { veryImportantFunction } = gazeSlice.actions;

export const { getVeryImportantValue } = gazeSlice.selectors;
