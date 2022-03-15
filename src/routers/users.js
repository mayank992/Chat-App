const express = require('express');
const User = require('../models/User');
const userService = require('../services/user');
const channelService = require('../services/channel');

const router = new express.Router();

router.post('/login', (req, res) => {
  const { username, name } = req.body;

  try {
    const user = User.findByUsername(username);

    if (user) {
      return res.status(200).send({ id: user.id, name: user.name, username: user.username });
    }

    const newUser = userService.createUser(username, name);

    res.status(201).send(newUser);
  } catch (err) {
    res.status(500).send({ message: 'something went wrong' });
  }
});

router.post('/signup', (req, res) => {
  res.status(404).end();
});

router.get('/alldetails', (req, res) => {
  const userId = req.user.id;

  try {
    const user = User.findOne(userId);

    if (!user) {
      return res.status(404).send({ message: 'user not found' });
    }

    res.status(200).send({
      ...user,
      directMessages: channelService.populateChannelDetails(userId, user.directMessages),
      channels: channelService.populateChannelDetails(userId, user.channels),
    });
  } catch (err) {
    res.status(500).send({ message: 'something went wrong' });
  }
});

module.exports = router;
