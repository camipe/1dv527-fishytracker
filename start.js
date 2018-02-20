const mongoose = require('mongoose');

// setup enviroment file
require('dotenv').config({ path: 'variables.env' });

// setup database connection
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.error(`Error: ${err.message}`);
});

// import models
require('./models/Fish');

// start app!
const app = require('./app');

app.set('port', process.env.PORT || 8080);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
