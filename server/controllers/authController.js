const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const crypto = require('crypto');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/sendEmail');

// Registering new user
exports.signup = catchAsync(async (req, res, next) => {
  await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPass: req.body.confirmPass,
  });

  res.status(201).json({
    status: 'success',
    message: 'User created successfully',
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

  const cookieOptions = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  if (process.env.ENV === 'prod') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

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
      return next(new AppError('You are not authorized', 403));
    }
    next();
  };
};

// Forgot password
exports.forgotPass = catchAsync(async (req, res, next) => {
  // Search for the user with the specified email
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return next(
      new AppError("User with specified email address doesn't exist", 404)
    );

  // Generate the random reset token
  const token = await user.createResetToken();
  await user.save({ validateBeforeSave: false });

  // Pass the reset token to client email
  const link = `${req.protocol}://localhost:3000/reset/${token}`;
  const sub = 'Reset Password Link';
  const text = `Reset your password clicking on this link ${link} valid only for 10 min `;
  sendEmail(user.email, sub, text);

  res.status(200).json({
    status: 'success',
    message: 'Reset Email sent successfully',
  });
});

// Reseting the user pass
exports.reset = catchAsync(async (req, res, next) => {
  // hash the token and find the user having token not expired
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user) return next(new AppError('The token is invalid or expired', 400));

  // change passwordUpdated field and resetToken
  user.password = req.body.password;
  user.confirmPass = req.body.confirmPass;
  user.passwordUpdated = Date.now();
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.status(200).json({
    status: 'success',
    message: 'Password updated successfully.Please login to proceed',
  });
});

// Updating current user password
exports.updatePass = catchAsync(async (req, res, next) => {
  // get the user from the collecion
  const user = await User.findById(req.user.id).select('+password');

  //check if the current password is true
  if (!(await user.correctPass(req.body.passCurrent, user.password))) {
    return next(new AppError('Current user password is invalid', 401));
  }

  // if user exists update the password
  user.password = req.body.password;
  user.confirmPass = req.body.confirmPass;
  user.passwordUpdated = Date.now();
  await user.save();

  res.status(200).json({
    status: 'success',
    message: 'Password Updated successfuly.',
  });
});
