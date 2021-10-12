const express = require('express');

const router = express.Router();
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');

router.get('/top5', tourController.getTop5, tourController.getAllTours);
router.get('/', tourController.getAllTours);
router.route('/:id').get(tourController.getTour);

router.post(
  '/create',
  authController.protect,
  authController.restrictTo('admin', 'tour-guide'),
  tourController.create
);

router.post(
  '/update/:id',
  authController.protect,
  authController.restrictTo('admin', 'tour-guide'),
  tourController.update
);

router.delete(
  '/delete/:id',
  authController.protect,
  authController.restrictTo('admin', 'tour-guide'),
  tourController.delete
);

module.exports = router;
