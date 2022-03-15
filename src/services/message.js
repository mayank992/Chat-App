const User = require("../models/User");
const Channel = require("../models/Channel");
const Message = require("../models/Message");
const channelService = require("./channel");

function createMessage(from, to, text) {
  const newMessage = Message.insertOne({
    text,
    from,
    to,
    time: new Date().toISOString(),
  });

  return newMessage;
}

function populateUsersInMessages(channelId, messages = []) {
  const channel = Channel.findOne(channelId);
  const channelMembers = channel.members;

  return messages.map((message) => {
    const from = User.findOne(message.from);
    let to = null;

    if (channel.type === "DM") {
      to = User.findOne(
        channelMembers.find((memberId) => memberId !== from.id)
      );
    } else if (channel.type === "GROUP") {
      to = channel;
    }

    return {
      ...message,
      from: { id: from.id, name: from.name },
      to: { id: to.id, name: to.name },
    };
  });
}

function getChannelMessages(channelId) {
  const messages = Message.findAll();

  const filteredMessages = messages.filter(
    (message) => message.to === channelId
  );

  return populateUsersInMessages(channelId, filteredMessages);
}

module.exports = {
  createMessage,
  getChannelMessages,
  populateUsersInMessages,
};
