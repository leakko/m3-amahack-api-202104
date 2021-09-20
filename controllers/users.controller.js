const User = require("../models/User.model");
const createError = require("http-errors");

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.currentUser)
    .then((user) => res.json(user))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((u) => res.json(u))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.path;
  }
  User.create(req.body)
    .then((user) => {
      res.json(user);
    })
    .catch(next);
};

module.exports.editUser = (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.path;
  }
  User.findByIdAndUpdate(req.currentUser, req.body)
    .then((u) => res.json(u))
    .catch(next);
};
