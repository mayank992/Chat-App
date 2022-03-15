const User = require('../models/User');

function auth(req, res, next) {
  if (req.url === '/users/login' || req.url === '/users/signup') {
    return next();
  }

  const userId = req.headers.userid;

  if (!userId) {
    return res.status(401).send({ message: 'unauthorized' });
  }

  req.user = User.findOne(userId);

  next();
}

module.exports = auth;
