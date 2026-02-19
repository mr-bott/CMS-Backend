const { ZodError } = require("zod");

const globalErrorHandler = (err, req, res, next) => {

  // Default values
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Handle Zod Validation Error
  if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation Failed";

    return res.status(statusCode).json({
      status: "fail",
      message,
      errors: err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message
      }))
    });
  }

  // Production response format
  res.status(statusCode).json({
    status: err.status || "error",
    message
    // ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
};

module.exports = globalErrorHandler;
