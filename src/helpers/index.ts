import { client } from "../utils/apiClient";
import { CHAT_TYPE } from "../constants/index";
import { HttpMethods } from "../types/requestTypes";

export async function login({
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

export async function getUserDetails(userId: string, options: any) {
  return client("/users/alldetails", {
    headers: { userid: userId },
    ...options,
  });
}

export async function getLatestMessages(
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

export async function getChannelMembers(
  channelId: string,
  options: { [property: string]: any }
) {
  return client(`/channels/${channelId}/members`, { ...options });
}

export async function sendMessageAPI(
  userId: string,
  message: {
    type: CHAT_TYPE;
    to: string;
    message: string;
  }
) {
  return client("/messages", {
    data: message,
    method: HttpMethods.POST,
    headers: { userid: userId },
  });
}

export async function createChannel(
  userId: string,
  createChannelReq: { channelName: string }
) {
  return client("/channels", {
    data: createChannelReq,
    method: HttpMethods.POST,
    headers: {
      userid: userId,
    },
  });
}

export async function addUserDm(
  userId: string,
  addUserReq: { username: string }
) {
  return client("/connections", {
    data: addUserReq,
    method: HttpMethods.POST,
    headers: {
      userid: userId,
    },
  });
}

export async function addUserChannel(
  channelId: string,
  addUserReq: { username: string }
) {
  return client(`/channels/${channelId}/members`, {
    data: addUserReq,
    method: HttpMethods.POST,
  });
}
