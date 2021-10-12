const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

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

exports.login = catchAsync(async (req, res, next) => {
  //chech if the email and password is there in req
  const { email, pass } = req.body;

  if (!email || !pass)
    return next(new AppError('Enter email and password', 404));

  // validate the cred
  const user = await User.findOne({ email: email }).select('+password');

  if (!user || !(await user.correctPass(pass, user.password)))
    return next(new AppError('Email address or password is invalid', 404));

  //generate token and pass to the client
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
  res.status(200).json({
    status: 'success',
    token,
  });
});
