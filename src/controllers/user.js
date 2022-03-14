const User = require("../models/User");
const { populateChannelDetails, populateUserDetails } = require("./common");

function getUser(userId) {
  const user = User.findOne(userId);

  return {
    ...user,
    connections: populateUserDetails(user.connections),
    channels: populateChannelDetails(user.channels),
  };
}

function createUser(username, fullname) {
  return User.insertOne({
    username,
    name: fullname,
    channels: [],
    connections: [],
  });
}

function addConnection(userId, connectionId) {
  const user = User.findOne(userId);

  if (!user.connections.includes(connectionId)) {
    const updatedUser = {
      ...user,
      connections: [...user.connections, connectionId],
    };

    User.updateOne(userId, updatedUser);
  }
}

function addChannel(userId, channelId) {
  const user = User.findOne(userId);

  if (!user.channels.includes(channelId)) {
    const updatedUser = {
      ...user,
      channels: [...user.channels, channelId],
    };

    User.updateOne(userId, updatedUser);
  }
}

function getuserByUsername(username) {
  const users = User.findAll();
  const user = users.find((user) => user.username === username);

  return user;
}

module.exports = {
  getUser,
  createUser,
  addConnection,
  addChannel,
  getuserByUsername,
  populateUserDetails,
};
