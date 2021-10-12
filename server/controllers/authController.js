const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Registering new user
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

// Logging In
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

// Check if the user is logged in and validate token
exports.protect = catchAsync(async (req, res, next) => {
  //check if the bearer token exists
  if (!req.headers.authorization || !req.headers.authorization.split(' ')[1]) {
    return next(new AppError('Please login to proceed', 401));
  }

  // validate the token
  const decoded = await promisify(jwt.verify)(
    req.headers.authorization.split(' ')[1],
    process.env.JWT_SECRET
  );

  // check if the user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser)
    return next(
      new AppError('The user belonging this token doesnt exist', 401)
    );

  // check if the password is changed afer the token was issued
  if (currentUser.changedPass(decoded.iat)) {
    return next(
      new AppError('Password recently changed.Please try loggin again', 401)
    );
  }
  req.user = currentUser; //carries current user for further middleware
  next();
});

// Verifying if the user is authorized
exports.restrictTo = function (...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You are not authorized to delete it', 403));
    }
    next();
  };
};
