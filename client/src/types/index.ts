import { CHAT_TYPE } from "../constants/index";

export interface ReqError {
  message: string;
}

export type UserType = {
  id: string;
  name: string;
  username: string;
};

export type ChannelType = {
  id: string;
  name: string;
};

export type MessageType = {
  id: string;
  from: UserType;
  to: UserType | ChannelType;
  message: string;
  time: string;
};

export type JoinedChannelType = {
  id: string;
  name: string;
};

export type ConnectionType = {
  id: string;
  name: string;
  username: string;
};

export type Selected = { type: CHAT_TYPE; id: string | null };
