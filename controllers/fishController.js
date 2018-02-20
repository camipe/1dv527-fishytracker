const mongoose = require('mongoose');

const Fish = mongoose.model('Fish');

exports.addFish = async (req, res) => {
  console.log(req.body);

  const fish = new Fish(req.body);
  await fish.save();

  res.json(fish);
};

// TODO: edit fish

// TODO: list fishes

// TODO: show fish
