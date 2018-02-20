const express = require('express');

const fishController = require('../controllers/fishController');
const { catchErrors } = require('../helpers/errorManager');

const router = express.Router();

// TODO: list all fishes
router.get('/fishes', catchErrors(fishController.getFishes));

// TODO: show fish details
router.get('/fish/:id', catchErrors(fishController.getFish));

// add fish
router.post('/fish/add', catchErrors(fishController.addFish));

// TODO: edit fish
router.patch('/fish/:id', catchErrors(fishController.editFish));

// TODO: edit fish
router.delete('/fish/:id', catchErrors(fishController.deleteFish));

module.exports = router;

