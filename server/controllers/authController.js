const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// 1 Sign up new user
exports.signup = catchAsync(async (req, res, next) => {
  const result = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPass: req.body.confirmPass,
  });

  res.status(201).json({
    status: 'success',
    user: result,
  });
});

//2 Login user
