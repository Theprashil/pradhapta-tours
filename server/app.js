const express = require('express');
const morgan = require('morgan');

const app = express();

//my imports
const tourRoute = require('./routes/tourRoute');
const userRoute = require('./routes/userRoute');
const globalErrorHandler = require('./controllers/errorController');

//Middlewares
if (process.env.ENV === 'Dev') {
  app.use(morgan('dev'));
}

app.use(express.json()); //body parser

//Routes
app.use('/api/tours', tourRoute);
app.use('/api/users', userRoute);

app.use(globalErrorHandler);
module.exports = app;
