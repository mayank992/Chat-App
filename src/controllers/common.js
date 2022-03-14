const User = require("../models/User");
const Channel = require("../models/Channel");

function populateUserDetails(userIds = []) {
  const users = User.findAll();

  return userIds.map((userId) => {
    const { id, username, name } = users.find((user) => user.id === userId);

    return { id, username, name };
  });
}

function populateChannelDetails(channelIds = []) {
  const channels = Channel.findAll();

  return channelIds.map((channelId) => {
    const { id, name } = channels.find((channel) => channel.id === channelId);

    return { id, name };
  });
}

function getOtherUser(userId, userIds) {
  if (userIds[0] === userId) {
    return userIds[1];
  }

  return userIds[0];
}

module.exports = { getOtherUser, populateChannelDetails, populateUserDetails };
