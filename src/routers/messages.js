const express = require('express');
const Channel = require('../models/Channel');
const messageService = require('../services/message');

const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
  const userId = req.user.id;
  const channelId = req.params.channelId;

  try {
    const channel = Channel.findOne(channelId);

    if (!channel) {
      return res.status(404).send({ message: 'channel not found' });
    }

    if (!channel.members.includes(userId)) {
      return res.status(401).send({ message: 'you are not part of the channel' });
    }

    const messages = messageService.getChannelMessages(channelId);

    res.status(200).send({ messages });
  } catch (err) {
    res.status(500).send({ message: 'something went wrong' });
  }
});

router.post('/', (req, res) => {
  const userId = req.user.id;
  const channelId = req.params.channelId;
  const text = req.body.text;

  try {
    const channel = Channel.findOne(channelId);

    if (!channel) {
      return res.status(404).send({ message: 'channel not found' });
    }

    if (!channel.members.includes(userId)) {
      return res.status(401).send({ message: 'you are not part of the channel' });
    }

    const message = messageService.createMessage(userId, channelId, text);

    res.status(201).send(message);
  } catch (err) {
    res.status(500).send({ message: 'something went wrong' });
  }
});

module.exports = router;
