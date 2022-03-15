const express = require('express');
const User = require('../models/User');
const Channel = require('../models/Channel');
const channelService = require('../services/channel');
const messagesRouter = require('./messages');
const membersRouter = require('./members');

const router = express.Router();
router.use('/:channelId/messages', messagesRouter);
router.use('/:channelId/members', membersRouter);

router.get('/:channelId', (req, res) => {
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

    const { id, name, type, members } = channelService.getChannelDetails(userId, channelId);

    res.status(200).send({ id, name, type, totalMembers: members.length });
  } catch (err) {
    res.status(500).send({ message: 'something went wrong' });
  }
});

router.post('/', (req, res) => {
  const userId = req.user.id;
  const channelType = req.body.type;
  const username = req.body.username;
  const channelName = req.body.channelName;

  try {
    if (channelType === 'DM') {
      const user = User.findByUsername(username);

      if (!user) {
        return res.status(404).send({ message: 'user not found' });
      }

      const newChannel = channelService.createDMChannel(userId, user.id);

      res.status(201).send(channelService.getChannelDetails(userId, newChannel.id));
    } else if (channelType === 'GROUP') {
      const channel = Channel.findByChannelName(channelName);

      if (channel) {
        return res.status(400).send({ message: 'channel name is already taken' });
      }

      const newChannel = channelService.createGroupChannel(userId, channelName);

      res.status(201).send(newChannel);
    }
  } catch (err) {
    res.status(500).send({ message: 'something went wrong' });
  }
});

module.exports = router;
