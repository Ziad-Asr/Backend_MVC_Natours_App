module.exports = (err, req, res, next) => {
  // console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error'; // It is {fail} on 404 and {error} on 500

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

// This error came from the error which sent from the ((next)) function in the app.js

// #################################################################################################################################
// ### The role of (((globalErrorHandler))) is to take the error thrown from the last ((next)) and {send a response based on it} ###
// #################################################################################################################################
