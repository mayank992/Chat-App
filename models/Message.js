const short = require("short-uuid");
const { getData, setData } = require("../db/db");

class Message {
  findAll() {
    return getData("messages");
  }

  updateAll(data) {
    return setData("messages", data);
  }

  findOne(messageId) {
    const messages = this.findAll();

    return messages.find((message) => message.id === messageId);
  }

  insertOne(newMessage) {
    const messages = this.findAll();

    let message = {
      id: short.generate(),
      ...newMessage,
    };

    this.updateAll([...messages, message]);

    return message;
  }

  updateOne(messageId, messageData) {
    const messages = this.findAll();
    const updatedMessages = messages.map((message) => {
      if (message.id === messageId) {
        return { ...message, ...messageData };
      }

      return message;
    });

    this.updateAll(updatedMessages);
  }
}

const message = new Message();

module.exports = message;
