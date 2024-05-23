// ~~~~~ Channel Ids ~~~~~
type ListHistoryChannelId = 'list-history';
type ChannelId = ListHistoryChannelId; // add more as needed

// ~~~~~ Channel Types ~~~~~
type ListHistoryChannel = {
  id: ListHistoryChannelId;
  data: {
    activeConversationId: string;
    activeElementId: string;
  };
};

type Channel = ListHistoryChannel; // add more as needed

// ~~~~~ Dictionary ~~~~~
type ChannelDictionary = {
  ['list-history']?: ListHistoryChannel;
};

export type {
  ListHistoryChannel,
  ListHistoryChannelId,
  ChannelDictionary,
  Channel,
  ChannelId,
};
