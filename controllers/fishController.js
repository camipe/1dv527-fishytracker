const mongoose = require('mongoose');

const Fish = mongoose.model('Fish');

// send response with all fishes
exports.getFishes = async (req, res) => {
  const fishes = await Fish.find();
  res.json(fishes);
};

// send response with one fish
exports.getFish = async (req, res) => {
  const fish = await Fish.findOne({ _id: req.params.id });

  res.json(fish.toJson());
};

// save a new fish to db and send it in response
exports.addFish = async (req, res) => {
  const fish = new Fish(req.body);
  await fish.save();

  res.json(fish);
};

// edit a fish in db and send updated version in response
exports.editFish = async (req, res) => {
  const fish = await Fish.findByIdAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  }).exec();
  res.json(fish);
};

// delete fish
exports.deleteFish = async (req, res) => {
  await Fish.deleteOne({ _id: req.params.id });
  res.json({ text: 'deleted' });
};
