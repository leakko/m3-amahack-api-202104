const User = require("../models/User.model");

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.currentUser)
    .then((user) => res.json(user))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.path;
  }
  User.create(req.body)
    .then((user) => res.json(user))
    .catch(next);
};
