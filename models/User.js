const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: 'Please supply an email address',
  },
  name: {
    type: String,
    required: 'Please supply a name',
    trim: true,
  },
});

userSchema.virtual('fishes', {
  ref: 'Fish',
  localField: '_id',
  foreignField: 'user',
});

module.exports = mongoose.model('User', userSchema);
