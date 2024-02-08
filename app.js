const express = require('express');
const morgan = require('morgan');

const toursRouter = require('./routes/toursRoutes.js');
const usersRouter = require('./routes/usersroutes.js');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // A middleware thet gives me info about the request
}

app.use(express.json()); // A middleware (Make data sent from the user {body} be available in the {req} paramater)

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'Fail',
  //   message: `Cant't find ${req.originalUrl} on this server!`,
  // });

  const err = new Error(`Cant't find ${req.originalUrl} on this server!`);
  err.statusCode = 404;
  err.status = 'fail';

  next(err);
  // 1) Anything passed to the next function will be taken as an error
  // 2) And then all next middlewares will be skipped until reaching out the error handeling function and pass the error to it.
});

// Global error handling middleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error'; // It is {fail} on 404 and {error} on 500

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
