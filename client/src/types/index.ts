export type UserType = {
  id: string;
  name: string;
  username: string;
};

export type ChannelType = {
  id: string;
  name: string;
  type: 'DM' | 'GROUP';
};

export type MessageType = {
  id: string;
  from: UserType;
  to: ChannelType;
  text: string;
  time: string;
};
