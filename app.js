const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError.js');
const globalErrorHandler = require('./controllers/errorController.js');
const toursRouter = require('./routes/toursRoutes.js');
const usersRouter = require('./routes/usersRoutes.js');

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

// _______________________________________________________________________________________________________________________________
// ####################
// ## Error handling ##
// ####################

// ((( 1 )))
// It will only reach this part if the route that the user typed is not handled
app.all('*', (req, res, next) => {
  next(new AppError(`Cant't find ${req.originalUrl} on this server!`, 404));
});
// 1) Anything passed to the next function will be taken as an error
// 2) And then all next middlewares will be skipped until reaching out the error handeling function and pass the error to it.

// So this next will throw this error {{AppError}} to the next middleware which will take the error and pass it to a specific error handling function

// #######################################################################################################
// ### The role of (((AppError))) is to {make an error} and the (next) throw it to the next middleware ###
// #######################################################################################################

// ((( 2 )))
// Global error handling ((middleware))
app.use(globalErrorHandler);
// The role of (((globalErrorHandler))) is to take the error thrown from the last ((next)) {{{has called from any past route}}} and send a response based on it

// _______________________________________________________________________________________________________________________________

module.exports = app;
