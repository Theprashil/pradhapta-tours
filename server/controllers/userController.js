const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');

// Fn to loop req.body to remove unwanted fields
const filteredBody = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  //check if the body contains to update pass or not

  if (req.body.password || req.body.confirmPass)
    return next(
      new AppError('Please use /updatePass route to update passwords', 400)
    );

  //filter the obj and update it
  const user = await User.findByIdAndUpdate(
    req.user.id,
    filteredBody(req.body, 'name', 'email'),
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    message: 'User updated successfully',
    data: user,
  });
});

// Delete the user
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(200).json({
    status: 'success',
    message: 'User deleted successfully',
  });
});

//Admin only actions
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const result = await User.find();

  if (!result) return next(new AppError('No users found in the database', 400));

  res.status(200).json({
    status: 'success',
    users: result,
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new AppError("User doesn't exist with given id", 400));

  res.status(200).json({
    status: 'success',
    user,
  });
});
