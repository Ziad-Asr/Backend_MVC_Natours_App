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
