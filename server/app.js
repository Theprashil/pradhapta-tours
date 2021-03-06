const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

const app = express();

//my imports
const tourRoute = require('./routes/tourRoute');
const userRoute = require('./routes/userRoute');
const paymentRoute = require('./routes/paymentRoute');
const globalErrorHandler = require('./controllers/errorController');

//Middlewares
const corOptions = {
  // origin: ['http://localhost:3000', 'https://pradhapta-tours.netlify.app/'],
  origin: '*',
  credentials: true,
};

app.use(cors(corOptions));

//sets security headers
app.use(helmet());

// logs request in console
if (process.env.ENV === 'Dev') {
  app.use(morgan('dev'));
}

// Limit req from the same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from the ip. Please try again in an hour',
});

app.use('/api', limiter);

//body parser
app.use(express.json({ limit: '10kb' }));

// Data sanitization against nosql query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevents parameter pollution
app.use(
  hpp({
    whitelist: ['duration'], //will add more later on
  })
);

app.use('/uploads', express.static('uploads'));

//Routes
app.use('/api/tours', tourRoute);
app.use('/api/users', userRoute);
app.use('/api/', paymentRoute);

app.use(globalErrorHandler);
module.exports = app;
