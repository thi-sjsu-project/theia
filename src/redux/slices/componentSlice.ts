import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  activeConvoID : string;
  selectedElementID : string;
};

const initialState: InitialState = {
    activeConvoID : "",
    selectedElementID : "",
};

export const componentSlice = createSlice({
  name: 'componentContext',
  initialState,
  reducers: {
    // add state updating functions here)
    setActiveConvoID : (state, action : PayloadAction<string>) => {
        state.activeConvoID = action.payload;
    },

    setSelectedElementID : (state, action : PayloadAction<string>) => {
        state.selectedElementID = action.payload;
    },
  },

  selectors: {
    // add selector functions here (to get state values from the store)
    getActiveConvoID : (state) => state.activeConvoID,
    getSelectedElementID : (state) => state.selectedElementID,
  },
});

export const { setActiveConvoID, setSelectedElementID } =
  componentSlice.actions;

export const { getActiveConvoID, getSelectedElementID } = componentSlice.selectors;
