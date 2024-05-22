import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  activeConvoID : string;
};

const initialState: InitialState = {
    activeConvoID : "",
};

export const componentSlice = createSlice({
  name: 'componentContext',
  initialState,
  reducers: {
    // add state updating functions here)
    setActiveConvoID : (state, action : PayloadAction<string>) => {
        state.activeConvoID = action.payload;
        console.log(action.payload);
    }
  },

  selectors: {
    // add selector functions here (to get state values from the store)
    getActiveConvoID : (state) => state.activeConvoID,
  },
});

export const { setActiveConvoID } =
  componentSlice.actions;

export const { getActiveConvoID } = componentSlice.selectors;
