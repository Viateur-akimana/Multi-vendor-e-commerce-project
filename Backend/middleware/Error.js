const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  //wrong mongodb id
  if (err.name === "castError") {
    const message = `wrong id ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //duplicate key
  if (err.name === 11000) {
    const message = `this ${Object.keys(err.keyValue)} is duplicate`;
    err = new ErrorHandler(message, 400);
  }
  //JsonwebToken error handling
  if (err.name === "JsonWebTokenError") {
    const message = "use of wrong urls";
    err = new ErrorHandler(message, 400);
  }

  //expiring of jwt
  if (err.name === "TokenExpiredError") {
    const message = "the jwt is expired";
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: "false",
    message: err.message,
  });
};
