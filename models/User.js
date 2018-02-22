const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  email: String,
  name: {
    type: String,
    required: 'Please supply a name',
    trim: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

userSchema.methods.toJson = function convertToHATEOAS(serverURL) {
  return {
    _id: this._id,
    name: this.name,
    created: this.created,
    links: {
      self: `http://${serverURL}/api/v1/users/${this._id}`,
      fishes: `http://${serverURL}/api/v1/users/${this._id}/fishes`,
    },
  };
};

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
