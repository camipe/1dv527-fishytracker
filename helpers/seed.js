const mongoose = require('mongoose');
const users = require('../data/users');
const fishes = require('../data/fishes');

const User = mongoose.model('User');
const Fish = mongoose.model('Fish');
const Hook = mongoose.model('Hook');

async function seedDatabase() {
  try {
    // empty DB
    console.log('Dumping current data.');
    await User.remove();
    await Fish.remove();
    await Hook.remove();
    console.log('Done, database is empty!');

    console.log('Inserting data.');

    // create users
    const admin = await User.registerAsync(users.sample[0], users.sample[0].password);
    const user = await User.registerAsync(users.sample[1], users.sample[1].password);

    // admin fishes
    const adminFishes = fishes.sample[0].map((e) => {
      const fish = e;
      fish.user = admin._id;
      return fish;
    });

    // user fishes
    const userFishes = fishes.sample[1].map((e) => {
      const fish = e;
      fish.user = user._id;
      return fish;
    });

    // insert fishes in db
    await Fish.insertMany(adminFishes);
    await Fish.insertMany(userFishes);

    console.log('Data insert successful.');
  } catch (error) {
    console.log({
      error: 'somthing went wrong',
      message: error,
    });
  }
}
seedDatabase();
