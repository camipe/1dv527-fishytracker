const express = require('express');
const routes = require('./routes/index');
const bodyParser = require('body-parser');
const errorManager = require('./helpers/errorManager');
const passport = require('passport');
const passportJWT = require("passport-jwt");
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const mongoose = require('mongoose');

const User = mongoose.model('User');

// create app
const app = express();

// setup bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// log requests
app.use(morgan('dev'));

// passport is used for authentication
app.use(passport.initialize());
// local user
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// jwt
const jwtOptions = {
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};
const jwtStrategy = new passportJWT.Strategy(jwtOptions, async (payload, next) => {
  console.log('payload received', payload);

  const user = await User.findById(payload.id);
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});
passport.use(jwtStrategy);

// setup routes
app.use('/api/v1', routes);

// catch and send error response to user
app.use(errorManager.showError);

// export
module.exports = app;
