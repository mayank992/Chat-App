const express = require("express");
const channelService = require("../controllers/channel");
const messageService = require("../controllers/message");
const { applyPagination } = require("../utils");

const router = new express.Router();

router.get("/:channelId/messages", (req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;
  const channelId = req.params.channelId;

  try {
    const messages = messageService.getChannelMessages(channelId);
    const paginatedMessages = applyPagination(messages, page, limit);
    paginatedMessages.data = messageService.populateUsersInChannelMessages(
      paginatedMessages.data
    );

    res.status(200).send(paginatedMessages);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.get("/:channelId/members", (req, res) => {
  const channelId = req.params.channelId;

  try {
    const channelMembers = channelService.getChannelMembers(channelId);

    res.status(200).send(channelMembers);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.post("/:channelId/members", (req, res) => {
  const channelId = req.params.channelId;
  const username = req.body.username;

  try {
    channelService.addChannelMember(username, channelId);

    res.status(201).end();
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.post("/", (req, res) => {
  const userId = req.user.id;
  const channelName = req.body.channelName;

  try {
    const newChannel = channelService.createChannel(userId, channelName);

    res.status(201).send(newChannel);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = router;
