const short = require("short-uuid");
const { getData, setData } = require("../db/db");

class Channel {
  findAll() {
    return getData("channels");
  }

  updateAll(data) {
    return setData("channels", data);
  }

  findOne(channelId) {
    const channels = this.findAll();

    return channels.find((channel) => channel.id === channelId);
  }

  findByChannelName(channelName) {
    const channels = this.findAll();

    return channels.find((channel) => channel.name === channelName);
  }

  insertOne(newChannel) {
    const channels = this.findAll();
    const channel = {
      id: short.generate(),
      ...newChannel,
    };

    this.updateAll([...channels, channel]);

    return channel;
  }

  updateOne(channelId, channelData) {
    const channels = this.findAll();
    const updatedChannels = channels.map((channel) => {
      if (channel.id === channelId) {
        return { ...channel, ...channelData };
      }

      return channel;
    });

    this.updateAll(updatedChannels);
  }
}

const channel = new Channel();

module.exports = channel;
