const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const fishSchema = new mongoose.Schema({
  user: String,
  position: [Number],
  species: String,
  weight: Number,
  length: Number,
  imageUrl: String,
  description: String,
  tags: [String],
});

module.exports = mongoose.model('Fish', fishSchema);
