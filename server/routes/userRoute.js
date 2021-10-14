const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.get(
  '/',
  authController.protect,
  authController.restrictTo('admin'),
  userController.getAllUsers
);
router.get(
  '/:id',
  authController.protect,
  authController.restrictTo('admin'),
  userController.getUser
);
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPass);
router.post('/reset/:token', authController.reset);
router.post('/updatePass', authController.protect, authController.updatePass);
router.post('/updateMe', authController.protect, userController.updateMe);
router.delete('/deleteMe', authController.protect, userController.deleteMe);

module.exports = router;
