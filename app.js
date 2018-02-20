const express = require('express');
const routes = require('./routes/index');
const bodyParser = require('body-parser');
const errorManager = require('./helpers/errorManager');

// create app
const app = express();

// setup bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// setup routes
app.use('/api/v1', routes);

// catch and send error response to user
app.use(errorManager.showError);

// export
module.exports = app;
