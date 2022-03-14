const User = require("../models/User");

function auth(req, res, next) {
  if (req.url === "/login" || req.url === "signup") {
    return next();
  }

  const userId = req.headers.userid;
  req.user = User.findOne(userId);

  next();
}

module.exports = auth;
