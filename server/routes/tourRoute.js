const express = require('express');
const multer = require('multer');

const router = express.Router();
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limit: {
    fileSize: 1024 * 1024 * 3,
  },
  fileFilter: fileFilter,
});

router.get('/top5', tourController.getTop5, tourController.getAllTours);
router.get('/', tourController.getAllTours);
router.route('/:id').get(tourController.getTour);

router.post(
  '/create',
  authController.protect,
  authController.restrictTo('admin', 'tour-guide'),
  upload.single('imageCover'),
  // upload.fields([
  //   { name: 'imageCover', maxCount: 1 },
  //   {
  //     name: 'images',
  //     maxCount: 1,
  //   },
  // ]),
  tourController.create
);

router.post(
  '/update/:id',
  authController.protect,
  authController.restrictTo('admin', 'tour-guide'),
  upload.single('images'),
  tourController.update
);

router.delete(
  '/delete/:id',
  authController.protect,
  authController.restrictTo('admin', 'tour-guide'),
  tourController.delete
);

module.exports = router;
