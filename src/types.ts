import { MESSAGE_TYPE } from "./constants/index";

export type MessageType = {
  id: string;
  type: MESSAGE_TYPE;
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

export type KnownChannelType = {
  id: string;
  name: string;
  unreadCount: number;
};

export type UserType = {
  id: string;
  name: string;
  username: string;
};

export type KnownUserType = {
  id: string;
  name: string;
  username: string;
  unreadCount: number;
};
