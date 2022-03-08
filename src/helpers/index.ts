import axios from "axios";
import { client } from "../utils/apiClient";
import { CHAT_TYPE } from "../constants/index";
import { HttpMethods } from "../types/requestTypes";

export function login({
  username,
  firstname,
  lastname,
}: {
  username: string;
  firstname: string;
  lastname: string;
}) {
  return client("/users/login", {
    method: HttpMethods.POST,
    data: {
      username,
      name: `${firstname} ${lastname}`,
    },
  });
}

export function getUserDetails(userId: string, options: any) {
  return client("/users/alldetails", {
    headers: { userid: userId },
    ...options,
  });
}

export function getLatestMessages(
  userId: string,
  type: CHAT_TYPE,
  id: string,
  options: any
) {
  const url =
    type === CHAT_TYPE.DM
      ? `/connections/${id}/messages?limit=15`
      : `/channels/${id}/messages?limit=15`;

  return client(url, {
    headers: { userid: userId },
    ...options,
  });
}

export function getChannelMembers(
  channelId: string,
  options: { [property: string]: any }
) {
  return client(`/channels/${channelId}/members`, { ...options });
}

export function addUserToChannel(
  userId: string,
  channelId: string,
  username: string
) {
  return client(`/channels/${channelId}/members`, {
    data: {
      username,
    },
    method: HttpMethods.POST,
    headers: {
      userid: userId,
    },
  });
}

export function sendMessage(message: {
  type: CHAT_TYPE;
  from: string;
  to: string;
  message: string;
}) {
  let url =
    message.type === CHAT_TYPE.DM
      ? `/connections/${message.to}/messages`
      : `/channels/${message.to}/messages`;

  return client(url, {
    data: {
      message: message.message,
    },
    method: HttpMethods.POST,
    headers: { userid: message.from },
  });
}

export function createChannel(userId: string, channelName: string) {
  return client("/channels", {
    data: {
      channelName,
    },
    method: HttpMethods.POST,
    headers: {
      userid: userId,
    },
  });
}

export async function addUser(userId: string, username: string) {
  return client("/connections", {
    data: {
      username,
    },
    method: HttpMethods.POST,
    headers: {
      userid: userId,
    },
  });
}
