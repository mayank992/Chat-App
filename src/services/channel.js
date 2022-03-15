const User = require('../models/User');
const Channel = require('../models/Channel');
const userService = require('./user');

function getChannelDetails(memberId, channelId) {
  const channel = Channel.findOne(channelId);
  const members = channel.members;

  if (channel.type === 'DM') {
    const userId = memberId === members[0] ? members[1] : members[0];
    const user = User.findOne(userId);

    return { ...channel, name: user.name };
  } else if (channel.type === 'GROUP') {
    return channel;
  }
}

function createDMChannel(userId1, userId2) {
  const newChannel = Channel.insertOne({
    name: '',
    type: 'DM',
    members: [userId1, userId2],
  });

  userService.addDMChannel(userId1, newChannel.id);
  userService.addDMChannel(userId2, newChannel.id);

  return newChannel;
}

function createGroupChannel(userId, channelName) {
  const newChannel = Channel.insertOne({
    name: channelName,
    type: 'GROUP',
    members: [userId],
  });

  userService.addGroupChannel(userId, newChannel.id);

  return newChannel;
}

function addUserToChannel(userId, channelId) {
  userService.addGroupChannel(userId, channelId);

  const channel = Channel.findOne(channelId);

  if (channel.members.includes(userId)) {
    return;
  }

  const updatedChannel = {
    ...channel,
    members: [...channel.members, userId],
  };

  Channel.updateOne(channelId, updatedChannel);
}

function populateChannelDetails(userId, channelIds = []) {
  return channelIds.map(channelId => {
    const { id, name, type } = getChannelDetails(userId, channelId);

    return { id, name, type };
  });
}

module.exports = {
  getChannelDetails,
  createDMChannel,
  createGroupChannel,
  addUserToChannel,
  populateChannelDetails,
};
