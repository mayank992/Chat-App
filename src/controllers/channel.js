const Channel = require("../models/Channel");
const userService = require("./user");
const { populateChannelDetails, populateUserDetails } = require("./common");

function createChannel(userId, channelName) {
  const newChannel = Channel.insertOne({
    name: channelName,
    members: [userId],
  });

  userService.addChannel(userId, newChannel.id);

  return newChannel;
}

function createChannelWithUsers(userIds, channelName) {
  const newChannel = Channel.insertOne({
    name: channelName,
    members: userIds,
  });

  userService.addChannel(userId, newChannel.id);

  return newChannel;
}

function addChannelMember(username, channelId) {
  const user = userService.getuserByUsername(username);
  if (!user) {
    throw Error("user not found");
  }

  const channel = Channel.findOne(channelId);

  if (!channel.members.includes(user.id)) {
    Channel.updateOne(channelId, {
      ...channel,
      members: [...channel.members, user.id],
    });
  }

  userService.addChannel(user.id, channelId);
}

function getChannelMembers(channelId) {
  const channel = Channel.findOne(channelId);

  return populateUserDetails(channel.members);
}

module.exports = {
  populateChannelDetails,
  createChannel,
  createChannelWithUsers,
  addChannelMember,
  getChannelMembers,
};
