const mongoose = require('mongoose');
// const users = require('../data/users');
const fishes = require('../data/fishes');

const Fish = mongoose.model('Fish');

async function seedDatabase() {
  try {
    // empty DB
    console.log('Dumping current data.');
    await Fish.remove();
    console.log('Done, database is empty!');

    // insert new data
    console.log('Inserting data.');
    console.log(fishes.sample);
    await Fish.insertMany(fishes.sample);
    console.log('Data insert successful.');
  } catch (error) {
    console.log({
      error: 'somthing went wrong',
      message: error,
    });
  }
}

seedDatabase();
