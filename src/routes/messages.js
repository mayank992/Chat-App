const express = require("express");
const messageService = require("../controllers/message");

const router = new express.Router();

router.post("/", (req, res) => {
  const from = req.user.id;
  const to = req.body.to;
  const message = req.body.message;

  try {
    messageService.createMessage(from, to, message);

    res.status(201).end();
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = router;
