const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const hookSchema = new mongoose.Schema({
  url: {
    type: String,
    required: 'Please supply an URL.',
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Hook', hookSchema);
