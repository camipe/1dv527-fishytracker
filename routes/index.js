const express = require('express');

const fishController = require('../controllers/fishController');
const { catchErrors } = require('../helpers/errorManager');

const router = express.Router();

// list all fishes
router.get('/fishes', catchErrors(fishController.getFishes));

// show fish details
router.get('/fishes/:id', catchErrors(fishController.getFish));

// add fish
router.post('/fishes/add', catchErrors(fishController.addFish));

// edit fish
router.put('/fishes/:id', catchErrors(fishController.editFish));

// delete fish
router.delete('/fish/:id', catchErrors(fishController.deleteFish));

// authenticate
router.post('/auth');

module.exports = router;

