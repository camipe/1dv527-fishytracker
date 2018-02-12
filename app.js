const express = require('express');
const routes = require('./routes/index');
const bodyParser = require('body-parser');

// create app
const app = express();

// setup bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// setup routes
app.use('/', routes);

// export
module.exports = app;
