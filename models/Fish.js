const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const fishSchema = new mongoose.Schema({
  user: String,
  species: {
    type: String,
    trim: true,
    required: 'Please enter a species',
  },
  weight: {
    type: Number,
    required: 'Please enter a weight',
  },
  length: {
    type: Number,
    required: 'Please enter a length',
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

// takes the server url as an argument so it can set the links dynamically
fishSchema.methods.toJson = function convertToHATEOAS(serverURL) {
  return {
    species: this.species,
    weight: this.weight,
    length: this.length,
    description: this.description,
    imageUrl: this.imageUrl,
    tags: this.tags,
    location: this.location,
    links: {
      self: `http://${serverURL}/fishes/${this._id}`,
      user: `http://${serverURL}/users/Steve`,
    },
  };
};

module.exports = mongoose.model('Fish', fishSchema);
