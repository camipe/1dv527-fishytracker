const express = require('express');

const fishController = require('../controllers/fishController');

const router = express.Router();

router.post('/add', fishController.addFish);

module.exports = router;
