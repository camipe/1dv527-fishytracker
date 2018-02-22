const mongoose = require('mongoose');

const User = mongoose.model('User');

// send response with all users
exports.getUsers = async (req, res) => {
  let users = await User.find();
  users = users.map(user => user.toJson(req.headers.host));
  res.json(users);
};

// send response with one user
exports.getUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });

  res.json(user.toJson(req.headers.host));
};
