import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { WidgetChannel, ListHistoryChannel } from 'src/types/channel';

type InitialState = {
  widgetChannels: WidgetChannel;
};

const initialState: InitialState = {
  widgetChannels: {
    'list-history': {
      activeConversationId: '',
      activeElementId: '',
    },
  },
};

export const componentSlice = createSlice({
  name: 'componentContext',
  initialState,
  reducers: {
    updateListHistoryChannel: (
      state,
      action: PayloadAction<ListHistoryChannel>,
    ) => {
      state.widgetChannels['list-history'] = action.payload;
    },
  },

  selectors: {
    getListHistoryChannel: (state) => state.widgetChannels['list-history'],
  },
});

export const { updateListHistoryChannel } = componentSlice.actions;

export const { getListHistoryChannel } = componentSlice.selectors;
