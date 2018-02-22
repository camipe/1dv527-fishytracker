const express = require('express');
const passport = require('passport');

const fishController = require('../controllers/fishController');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const { catchErrors } = require('../helpers/errorManager');

const router = express.Router();

// list all users
router.get('/users', catchErrors(userController.getUsers));

// show user detail
router.get('/users/:id', catchErrors(userController.getUser));

// show user's fishes
router.get('/users/:id/fishes', catchErrors(fishController.getUserFishes));

// list all fishes
router.get('/fishes', catchErrors(fishController.getFishes));

// show fish details
router.get('/fishes/:id', catchErrors(fishController.getFish));

// add fish
router.post('/fishes/', passport.authenticate('jwt', { session: false }), catchErrors(fishController.addFish));

// edit fish
router.put('/fishes/:id', passport.authenticate('jwt', { session: false }), catchErrors(fishController.editFish));

// delete fish
router.delete('/fishes/:id', passport.authenticate('jwt', { session: false }), catchErrors(fishController.deleteFish));

// authenticate
router.post('/login', passport.authenticate('local'), catchErrors(authController.login));

// create hook
router.post('/hook', passport.authenticate('jwt', { session: false }), catchErrors(userController.addHook));

module.exports = router;

