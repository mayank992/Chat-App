const express = require("express");
const userService = require("../controllers/user");

const router = new express.Router();

router.post("/login", (req, res) => {
  const { username, name } = req.body;

  try {
    const user = userService.createUser(username, name);

    res.status(200).send(user);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.post("/signup", (req, res) => {
  res.status(201).end();
});

router.get("/alldetails", (req, res) => {
  const userId = req.user.id;

  try {
    const user = userService.getUser(userId);

    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
});

router.get("/", (req, res) => {
  const userId = req.user.id;

  try {
    const { id, username, name } = userService.getUser(userId);

    res.status(200).send({ id, username, name });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = router;
