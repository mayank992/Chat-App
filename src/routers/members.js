const express = require('express');
const User = require('../models/User');
const Channel = require('../models/Channel');
const userService = require('../services/user');
const channelService = require('../services/channel');

const router = express.Router({ mergeParams: true });

router.get('', (req, res) => {
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

    const members = userService.populateUserDetails(channel.members);

    res.status(200).send({ members });
  } catch (err) {
    res.status(500).send({ message: 'somwthing went wrong' });
  }
});

router.post('', (req, res) => {
  const userId = req.user.id;
  const channelId = req.params.channelId;
  const username = req.body.username;

  try {
    const channel = Channel.findOne(channelId);

    if (!channel) {
      return res.status(404).send({ message: 'channel not found' });
    }

    if (!channel.members.includes(userId)) {
      return res.status(401).send({ message: 'you are not part of the channel' });
    }

    if (channel.type === 'DM') {
      return res.status(400).send({ message: 'you cannot add new members in a DM channel' });
    }

    const userToAdd = User.findByUsername(username);

    if (!userToAdd) {
      return res.status(400).send({ message: 'user not found' });
    }

    channelService.addUserToChannel(userToAdd.id, channel.id);

    res.status(201).send({ message: 'user added successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'somwthing went wrong' });
  }
});

module.exports = router;
