const express = require('express');

const fishController = require('../controllers/fishController');
const { catchErrors } = require('../helpers/errorManager');

const router = express.Router();

router.post('/add', catchErrors(fishController.addFish));

module.exports = router;
