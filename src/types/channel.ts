export type ListHistoryChannel = {
  activeConversationId: string;
  activeElementId: string;
};

export type WidgetChannel = {
  'list-history': ListHistoryChannel;
};
