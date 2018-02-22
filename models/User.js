const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
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

// https://github.com/saintedlama/passport-local-mongoose/issues/218
userSchema.statics.registerAsync = function registerAsync(data, password) {
  return new Promise((resolve, reject) => {
    this.register(data, password, (err, user) => {
      if (err) return reject(err);
      return resolve(user);
    });
  });
};

userSchema.statics.authenticateAsync = function authenticateAsync(data, password) {
  return new Promise((resolve, reject) => {
    this.authenticate(data, password, (err, user) => {
      if (err) return reject(err);
      return resolve(user);
    });
  });
};

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
