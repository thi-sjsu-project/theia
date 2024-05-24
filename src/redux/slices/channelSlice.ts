import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ChannelDictionary, Channel, ChannelId } from 'src/types/channel';

type InitialState = {
  widgetChannels: ChannelDictionary;
};

const initialState: InitialState = {
  widgetChannels: {},
};

export const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    updateChannel: (state, action: PayloadAction<Channel>) => {
      state.widgetChannels[action.payload.id] = action.payload;
    },
  },

  selectors: {
    getChannel: (state, channelId: ChannelId) =>
      state.widgetChannels[channelId],
  },
});

export const { updateChannel } = channelSlice.actions;

export const { getChannel } = channelSlice.selectors;
