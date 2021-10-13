const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPass);
router.post('/reset/:token', authController.reset);
router.post('/update', authController.protect, authController.update);

module.exports = router;
