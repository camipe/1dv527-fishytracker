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
  // coordinates [lng, lat]
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

fishSchema.methods.toJson = function convertToHATEOAS() {
  return {
    species: this.species,
    weight: this.weight,
    length: this.length,
    description: this.description,
    imageUrl: this.imageUrl,
    tags: this.tags,
    links: {
      link1: 'www.google.se',
      link2: 'lnk.se',
    },
  };
};

module.exports = mongoose.model('Fish', fishSchema);
