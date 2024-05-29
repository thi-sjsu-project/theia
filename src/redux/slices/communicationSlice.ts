import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type CommunicationState = {
  activeConversationId: string;
  activeElementId: string;
};

const initialState: CommunicationState = {
  activeConversationId: '',
  activeElementId: '',
};

export const communicationSlice = createSlice({
  name: 'communication',
  initialState,
  reducers: {
    updateCommunication: (state, action: PayloadAction<CommunicationState>) => {
      state.activeConversationId = action.payload.activeConversationId;
      state.activeElementId = action.payload.activeElementId;
    },
  },
  selectors: {
    getCommunication: (state) => state,
    getActiveConversationId: (state) => state.activeConversationId,
    getActiveElementId: (state) => state.activeElementId,
  },
});

export const { updateCommunication } = communicationSlice.actions;
export const { getCommunication, getActiveConversationId, getActiveElementId } =
  communicationSlice.selectors;
