const mongoose = require('mongoose');
const axios = require('axios');

const Hook = mongoose.model('Hook');

mongoose.Promise = global.Promise;

const fishSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an user!',
  },
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
  created: {
    type: Date,
    default: Date.now,
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
    _id: this._id,
    species: this.species,
    weight: this.weight,
    length: this.length,
    description: this.description,
    imageUrl: this.imageUrl,
    tags: this.tags,
    location: this.location,
    created: this.created,
    links: {
      self: `http://${serverURL}/api/v1/fishes/${this._id}`,
      user: `http://${serverURL}/api/v1/users/${this.user}`,
    },
  };
};

// each time a fish is saved, server makes a post to all hook URLs
// TODO: make sure this doesn't happen on edit.
fishSchema.post('save', async (fish) => {
  try {
    const hooks = await Hook.find();
    hooks.forEach(async (hook) => {
      await axios.post(hook.url, fish);
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = mongoose.model('Fish', fishSchema);
