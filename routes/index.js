const express = require('express');
const passport = require('passport');

const fishController = require('../controllers/fishController');
const authController = require('../controllers/authController');
const { catchErrors } = require('../helpers/errorManager');

const router = express.Router();

// list all fishes
router.get('/fishes', catchErrors(fishController.getFishes));

// show fish details
router.get('/fishes/:id', catchErrors(fishController.getFish));

// add fish
router.post('/fishes/', catchErrors(fishController.addFish));

// edit fish
router.put('/fishes/:id', catchErrors(fishController.editFish));

// delete fish
router.delete('/fish/:id', catchErrors(fishController.deleteFish));

// authenticate
router.post('/login', passport.authenticate('local'), catchErrors(authController.login));

module.exports = router;

