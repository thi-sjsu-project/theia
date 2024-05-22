import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { type WidgetChannel } from 'src/types/support-types';

type InitialState = {
  widgetChannels: {
    [key in WidgetChannel]: any;
  };
};

const initialState: InitialState = {
  widgetChannels: {
    'list-history': {
      activeConvoID : "",
      selectedElementID : "",
    },
  },
};

export const componentSlice = createSlice({
  name: 'componentContext',
  initialState,
  reducers: {
    // add state updating functions here)
    setActiveConvoID : (state, action : PayloadAction<string>) => {
        state.widgetChannels['list-history'].activeConvoID = action.payload;
    },

    setSelectedElementID : (state, action : PayloadAction<string>) => {
        state.widgetChannels['list-history'].selectedElementID = action.payload;
    },
  },

  selectors: {
    // add selector functions here (to get state values from the store)
    getActiveConvoID : (state) => state.widgetChannels['list-history'].activeConvoID,
    getSelectedElementID : (state) => state.widgetChannels['list-history'].selectedElementID,
  },
});

export const { setActiveConvoID, setSelectedElementID } =
  componentSlice.actions;

export const { getActiveConvoID, getSelectedElementID } = componentSlice.selectors;
