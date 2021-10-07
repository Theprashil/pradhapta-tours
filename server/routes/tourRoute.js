const express = require('express');

const router = express.Router();
const tourController = require('../controllers/tourController');

router.get('/top5', tourController.getTop5, tourController.getAllTours);
router.get('/', tourController.getAllTours);
router.route('/:id').get(tourController.getTour);
router.post('/create', tourController.create);
router.post('/update/:id', tourController.update);
router.delete('/delete/:id', tourController.delete);

module.exports = router;
