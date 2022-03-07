import axios from "axios";
import { client } from "../utils/apiClient";
import { users, channels } from "./fixture";
import { CHAT_TYPE } from "../constants/index";

async function delay(ms: number) {
  await new Promise((resolve, reject) => {
    setTimeout(() => resolve(""), ms);
  });
}

export async function getUsers() {
  await delay(1000);
  return users;
}

export async function getConnections(
  userId: string,
  options: { [property: string]: any }
) {
  return client("/users/connections", {
    headers: { userid: userId },
    ...options,
  });
}

export async function getChannels() {
  await delay(1000);
  return channels;
}

export async function getJoinedChannels(
  userId: string,
  options: { [property: string]: any }
) {
  return client("/channels/joined", {
    headers: { userid: userId },
    ...options,
  });
}

export async function getMessages(
  userId: string,
  type: CHAT_TYPE,
  id: string,
  options: { [property: string]: any }
) {
  const url =
    type === CHAT_TYPE.DM
      ? `/users/${id}/messages`
      : `/channels/${id}/messages`;

  return client(url, {
    headers: { userid: userId },
    ...options,
  });
}

export async function getChannelMembers(
  channelId: string,
  options: { [property: string]: any }
) {
  const res = await axios.get(`/channels/${channelId}/members`, { ...options });

  return res.data;
}

export async function getChannelNonMembers(
  channelId: string,
  options: { [property: string]: any }
) {
  const res = await axios.get(`/channels/${channelId}/nonmembers`, {
    ...options,
  });

  return res.data;
}

export async function addUserToChannel(channelId: string, userId: string) {
  await axios.post(`/channels/${channelId}/members`, { userId });
}

export async function sendMessageAPI(message: {
  type: CHAT_TYPE;
  from: string;
  fromId: string;
  to: string;
  toId: string;
  text: string;
}) {
  let url =
    message.type === CHAT_TYPE.DM
      ? `/users/${message.toId}/messages`
      : `/channels/${message.toId}/messages`;

  const res = await axios.post(
    url,
    {
      from: message.from,
      fromId: message.fromId,
      to: message.to,
      toId: message.toId,
      text: message.text,
    },
    { headers: { userid: message.fromId } }
  );

  return;
}

export async function loginAPI(body: {
  username: string;
  firstname: string;
  lastname: string;
}) {
  const res = await axios.post("/login", body);

  return res.data;
}
