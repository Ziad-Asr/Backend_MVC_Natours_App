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
  console.log('Hello, from the middleware!');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

module.exports = app;
