const mongoose = require('mongoose');
const users = require('../data/users');
const fishes = require('../data/fishes');

const User = mongoose.model('User');
const Fish = mongoose.model('Fish');

async function seedDatabase() {
  try {
    // empty DB
    console.log('Dumping current data.');
    await User.remove();
    await Fish.remove();
    console.log('Done, database is empty!');

    // insert new data
    console.log('Inserting data.');

    const user = await User.registerAsync(users.sample, users.sample.password);
    console.log(user);

    const fishesWithUser = fishes.sample.map((e) => {
      const fish = e;
      fish.user = user._id;
      return fish;
    });

    await Fish.insertMany(fishesWithUser);
    console.log('Data insert successful.');
  } catch (error) {
    console.log({
      error: 'somthing went wrong',
      message: error,
    });
  }
}

seedDatabase();
