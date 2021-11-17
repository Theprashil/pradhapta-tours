const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const ApiFeatures = require('../utils/apiFeatures');

const err = new AppError('Cannot find the tour with given id', 404);

// 1 Create tour
exports.create = catchAsync(async (req, res, next) => {
  const img = `${req.protocol}://${req.get('host')}/${req.file.path}`;
  const result = await Tour.create({
    name: req.body.name,
    duration: req.body.duration,
    maxGroupSize: req.body.maxGroupSize,
    difficulty: req.body.difficulty,
    ratingsAverage: req.body.ratingsAverage,
    ratingsQuantity: req.body.ratingsQuantity,
    price: req.body.price,
    summary: req.body.summary,
    description: req.body.description,
    imageCover: img,
    // images: req.body.images,
    startDates: req.body.startDates,
  });

  res.status(201).json({
    status: 'success',
    tour: result,
  });
});

//2 Update tour
exports.update = catchAsync(async (req, res, next) => {
  const result = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!result) return next(err);

  res.status(201).json({
    status: 'success',
    tour: result,
  });
});

//3  Delete tour
exports.delete = catchAsync(async (req, res, next) => {
  const result = await Tour.findByIdAndDelete(req.params.id);

  if (!result) return next(err);

  res.status(200).json({
    status: 'success',
    message: 'Successfully Deleted',
  });
});

//4 Get tour

exports.getTour = catchAsync(async (req, res, next) => {
  const result = await Tour.findById(req.params.id);

  if (!result) return next(err);

  res.status(200).json({
    status: 'success',
    tour: result,
  });
});

//5 Get all tour
exports.getAllTours = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const result = await features.query;

  res.status(200).json({
    status: 'success',
    results: result.length,
    tours: result,
  });
});

//6 Get top 5
exports.getTop5 = catchAsync(async (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage, difficulty';
  req.query.fields = 'name, ratingsAverage, difficulty, price, duration';
  next();
});
