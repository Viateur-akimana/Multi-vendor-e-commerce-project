class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statuscode = statusCode;

    Error.captureStackTrace(this, this.statusCode);
  }
}

module.exports = ErrorHandler;
