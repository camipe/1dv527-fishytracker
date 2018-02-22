const express = require('express');
const routes = require('./routes/index');
const bodyParser = require('body-parser');
const errorManager = require('./helpers/errorManager');
const jwt = require('jsonwebtoken');
const passport = require('passport');
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
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// setup routes
app.use('/api/v1', routes);

// catch and send error response to user
app.use(errorManager.showError);

// export
module.exports = app;
