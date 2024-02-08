class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // Calls the parent class's constructor

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;

// #############################################################################################################
// ### The role of (((AppError))) is to { ((make)) an error } and the (next) throw it to the next middleware ###
// #############################################################################################################

// This error class accepts a
// 1)message ((will send it the Error default js class))
// 2)StatusCode of the error (we mae it dynamike to be able to use it throw out the project)
