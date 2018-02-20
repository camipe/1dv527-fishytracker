const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const fishSchema = new mongoose.Schema({
  user: String,
  species: {
    type: String,
    trim: true,
    required: 'Please enter a store name',
  },
  weight: {
    type: Number,
    required: 'Please enter a store name',
  },
  length: {
    type: Number,
    required: 'Please enter a store name',
  },
  location: {
    type: {
      type: String,
      default: 'Point',
    },
    coordinates: [{
      type: Number,
      required: 'You must supply coodinates!',
    }],
  },
  description: {
    type: String,
    trim: true,
  },
  imageUrl: String,
  tags: [String],
});

module.exports = mongoose.model('Fish', fishSchema);
