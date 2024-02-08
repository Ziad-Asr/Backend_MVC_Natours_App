const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    err: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Expected error like hitting a false route
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Unexpected error like faling of a thhird party package
  } else {
    console.error(`Error`, err);

    res.status(500).json({
      status: 'Error',
      message: `Something went wrong`,
    });
  }
};

module.exports = (err, req, res, next) => {
  // console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error'; // It is {fail} on 404 and {error} on 500

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    sendErrorProd(err, res);
  }
};

// This error came from the error which sent from the ((next)) function in the app.js => {{{err}}} variable

// #################################################################################################################################
// ### The role of (((globalErrorHandler))) is to take the error thrown from the last ((next)) and {send a response based on it} ###
// #################################################################################################################################
