const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  // generate token
  const payload = { id: req.user._id };
  const token = jwt.sign(payload, process.env.SECRET);
  res.json({ message: 'ok', token });
  // return token
  res.json({ success: true });
};
