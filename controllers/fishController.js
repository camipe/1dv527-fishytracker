const mongoose = require('mongoose');

const User = mongoose.model('User');
const Fish = mongoose.model('Fish');

// send response with all fishes
exports.getFishes = async (req, res) => {
  let fishes = await Fish.find();
  fishes = fishes.map(fish => fish.toJson(req.headers.host));
  res.json(fishes);
};

// send response with all fishes belonging to one user
exports.getUserFishes = async (req, res) => {
  let fishes = await Fish.find({ user: req.params.id });
  fishes = fishes.map(fish => fish.toJson(req.headers.host));
  res.json(fishes);
};

// send response with one fish
exports.getFish = async (req, res) => {
  const fish = await Fish.findOne({ _id: req.params.id });

  res.json(fish.toJson(req.headers.host));
};

// save a new fish to db and send it in response
exports.addFish = async (req, res) => {
  const fish = new Fish(req.body);
  const user = await User.findOne({ username: 'admin' });
  fish.user = user._id;

  await fish.save();

  res.json(fish.toJson(req.headers.host));
};

// edit a fish in db and send updated version in response
exports.editFish = async (req, res) => {
  const fish = await Fish.findByIdAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  }).exec();
  res.json(fish.toJson(req.headers.host));
};

// delete fish
exports.deleteFish = async (req, res) => {
  await Fish.deleteOne({ _id: req.params.id });
  res.json({ text: 'deleted' });
};
