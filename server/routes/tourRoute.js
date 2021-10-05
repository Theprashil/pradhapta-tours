const express = require('express');

const router = express.Router();
const tourController = require('../controllers/tourController');

router.route('/home').get(tourController.home);

module.exports = router;
