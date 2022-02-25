import axios from "axios";
import {
  knownUsers,
  users,
  knownChannels,
  channels,
  messages,
} from "./fixture";
import { MESSAGE_TYPE } from "../constants/index";

async function delay(ms: number) {
  await new Promise((resolve, reject) => {
    setTimeout(() => resolve(""), ms);
  });
}

export async function getUsers() {
  await delay(1000);
  return users;
}

export async function getKnownUsers(userId: string) {
  const res = await axios.get("/users/known", {
    headers: { userid: userId },
  });

  console.log(res.data);

  return res.data.map((user: any) => ({ ...user, unreadCount: 0 }));
}

export async function getChannels() {
  await delay(1000);
  return channels;
}

export async function getKnownChannels() {
  await delay(1000);
  return knownChannels;
}

export async function getMessages(
  userId: string,
  type: MESSAGE_TYPE,
  id: string
) {
  const url =
    type === MESSAGE_TYPE.DM ? `/users/${id}/dms` : `/channels/${id}/messages`;

  const res = await axios.get(url, { headers: { userid: userId } });

  return res.data;
}

export async function getMembers(channelId: string) {
  await delay(1000);
  return knownUsers;
}

export async function sendMessageAPI(message: {
  type: MESSAGE_TYPE;
  from: string;
  fromId: string;
  to: string;
  toId: string;
  text: string;
}) {
  let url =
    message.type === MESSAGE_TYPE.DM
      ? `/users/${message.toId}/dms`
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

export async function loginAPI({
  username,
  firstname,
  lastname,
}: {
  username: string;
  firstname: string;
  lastname: string;
}) {
  const res = await axios.post("/login", {
    username,
    firstname,
    lastname,
  });

  return res.data;
}
