import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SortTypes } from 'src/types/sortMethod';

export type CommunicationState = {
  activeConversationId: string;
  activeElementId: string;
  sortMethod: SortTypes;
};

const initialState: CommunicationState = {
  activeConversationId: '',
  activeElementId: '',
  sortMethod: 'gaia',
};

export const communicationSlice = createSlice({
  name: 'communication',
  initialState,
  reducers: {
    updateCommunication: (state, action: PayloadAction<CommunicationState>) => {
      state.activeConversationId = action.payload.activeConversationId;
      state.activeElementId = action.payload.activeElementId;
    },
    updateSortMethod: (state, action: PayloadAction<SortTypes>) => {
      state.sortMethod = action.payload;
    },
  },
  selectors: {
    getCommunication: (state) => state,
    getActiveConversationId: (state) => state.activeConversationId,
    getActiveElementId: (state) => state.activeElementId,
    getSortMethod: (state) => state.sortMethod,
  },
});

export const { updateCommunication, updateSortMethod } = communicationSlice.actions;
export const { getCommunication, getActiveConversationId, getActiveElementId, getSortMethod } =
  communicationSlice.selectors;
