import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Message } from 'src/types/schema-types';

type InitialState = {
  conversations: {
    [key: string]: {
      id: string;
      messages: Message[];
      numUnreadMessages: number;
      latestMessageId: string;
    };
  };
};

const initialState: InitialState = {
  conversations: {},
};

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      const message = action.payload;
      const { conversationId } = message;

      if (!state.conversations[conversationId]) {
        state.conversations[conversationId] = {
          id: conversationId,
          messages: [message],
          numUnreadMessages: 1,
          latestMessageId: message.id,
        };
      } else {
        state.conversations[conversationId].messages.push(message);
        state.conversations[conversationId].numUnreadMessages++;
        state.conversations[conversationId].latestMessageId = message.id;
      }
    },
    updateNumUnreadMessages: {
      prepare: (conversationId: string, numUnreadMessages: number) => {
        return { payload: { conversationId, numUnreadMessages } };
      },

      reducer: (
        state,
        action: PayloadAction<{
          conversationId: string;
          numUnreadMessages: number;
        }>,
      ) => {
        const { conversationId, numUnreadMessages } = action.payload;
        state.conversations[conversationId].numUnreadMessages =
          numUnreadMessages;
      },
    },
  },
  selectors: {
    getMessages: (state) => {
      const messages: Message[] = [];
      for (const conversationId in state.conversations) {
        const conversation = state.conversations[conversationId];
        messages.push(...conversation.messages);
      }

      return messages;
    },
    getMessage: (state, messageId: string) => {
      for (const conversationId in state.conversations) {
        const conversation = state.conversations[conversationId];
        const message = conversation.messages.find(
          (message) => message.id === messageId,
        );

        if (message) return message;
      }

      return null;
    },
    getConversationOfMessage: (state, messageId: string) => {
      for (const conversationId in state.conversations) {
        const conversation = state.conversations[conversationId];
        const message = conversation.messages.find(
          (message) => message.id === messageId,
        );

        if (message) return conversation;
        return null;
      }
    },
    getConversations: (state) => state.conversations,
    getConversation: (state, conversationId: string) =>
      state.conversations[conversationId],
  },
});

export const { addMessage, updateNumUnreadMessages } =
  conversationSlice.actions;

export const {
  getConversations,
  getConversation,
  getConversationOfMessage,
  getMessage,
  getMessages,
} = conversationSlice.selectors;