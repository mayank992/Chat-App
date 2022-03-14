const User = require("../models/User");
const Channel = require("../models/Channel");
const Message = require("../models/Message");
const { getFormatedTime } = require("../utils");

function createMessage(from, to, message) {
  const newMessage = Message.insertOne({
    message,
    from,
    to,
    time: getFormatedTime(),
  });

  return newMessage;
}

function getConnectionMessages(from, to) {
  const messages = Message.findAll();

  return messages.filter(
    (message) =>
      (message.from === from && message.to === to) ||
      (message.from === to && message.to === from)
  );
}

function getChannelMessages(channelId) {
  const messages = Message.findAll();

  return messages.filter(
    (message) => message.from === channelId || message.to === channelId
  );
}

function populateUsersInDms(messages = []) {
  return messages.map((message) => {
    const from = User.findOne(message.from);
    const to = User.findOne(message.to);

    return {
      ...message,
      from: { id: from.id, username: from.username, name: from.name },
      to: { id: to.id, username: to.username, name: to.name },
    };
  });
}

function populateUsersInChannelMessages(messages = {}) {
  return messages.map((message) => {
    const from = User.findOne(message.from);
    const to = Channel.findOne(message.to);

    return {
      ...message,
      from: { id: from.id, username: from.username, name: from.name },
      to: { id: to.id, name: to.name },
    };
  });
}

module.exports = {
  createMessage,
  getConnectionMessages,
  getChannelMessages,
  populateUsersInDms,
  populateUsersInChannelMessages,
};
