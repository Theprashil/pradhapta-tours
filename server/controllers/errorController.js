const env = process.env.ENV;

const devError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    stack: err.stack,
  });
};

const prodError = (err, res) => {
  if (err.isOperational === true) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong',
    });
  }
};

module.exports = (err, req, res, next) => {
  if (env === 'Dev') {
    devError(err, res);
  } else if (env === 'Prod') {
    prodError(err, res);
  }
};
