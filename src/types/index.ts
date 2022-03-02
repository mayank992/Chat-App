import { CHAT_TYPE } from "../constants/index";

export type MessageType = {
  id: string;
  type: CHAT_TYPE;
  from: UserType;
  to: UserType | ChannelType;
  text: string;
  time: string;
  seen: boolean;
};

export type ChannelType = {
  id: string;
  name: string;
};

export type JoinedChannelType = {
  id: string;
  name: string;
};

export type UserType = {
  id: string;
  name: string;
  username: string;
};

export type ConnectionType = {
  id: string;
  name: string;
  username: string;
  unreadCount?: number;
};

export type Selected = { type: CHAT_TYPE; id: string | null };
