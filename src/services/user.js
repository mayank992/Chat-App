const User = require("../models/User");

function createUser(username, name) {
  const user = User.insertOne({
    username,
    name,
    directMessages: [],
    channels: [],
  });

  return { id: user.id, name: user.name, username: user.username };
}

function addDMChannel(userId, channelId) {
  const user = User.findOne(userId);

  if (user.directMessages.includes(channelId)) {
    return user;
  }

  const updatedUser = {
    ...user,
    directMessages: [...user.directMessages, channelId],
  };

  return User.updateOne(userId, updatedUser);
}

function addGroupChannel(userId, channelId) {
  const user = User.findOne(userId);

  if (user.channels.includes(channelId)) {
    return user;
  }

  const updatedUser = {
    ...user,
    channels: [...user.channels, channelId],
  };

  return User.updateOne(userId, updatedUser);
}

function populateUserDetails(userIds = []) {
  const users = User.findAll();

  return userIds.map((userId) => {
    const { id, name } = users.find((user) => user.id === userId);

    return { id, name };
  });
}

module.exports = {
  createUser,
  addDMChannel,
  addGroupChannel,
  populateUserDetails,
};
