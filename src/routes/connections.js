const express = require("express");
const userService = require("../controllers/user");
const messageService = require("../controllers/message");
const { applyPagination } = require("../utils");

const router = new express.Router();

router.get("/:connectionId/messages", (req, res) => {
  const userId = req.user.id;
  const page = req.query.page;
  const limit = req.query.limit;
  const connectionId = req.params.connectionId;

  try {
    const messages = messageService.getConnectionMessages(userId, connectionId);
    const paginatedMessages = applyPagination(messages, page, limit);
    paginatedMessages.data = messageService.populateUsersInDms(
      paginatedMessages.data
    );

    res.status(200).send(paginatedMessages);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.post("/", (req, res) => {
  const userId = req.user.id;
  const username = req.body.username;

  try {
    const connection = userService.getuserByUsername(username);

    if (!connection) {
      return res.status(404).send({ message: "user not found" });
    }

    userService.addConnection(userId, connection.id);
    userService.addConnection(connection.id, userId);

    res.status(201).end();
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = router;
