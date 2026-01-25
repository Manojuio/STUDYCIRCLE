// backend/src/middlewares/error.middleware.js
import ApiError from "../utils/ApiError.js";
import logger from "../utils/logger.js";

const errorMiddleware = (err, req, res, next) => {
  // Log error details
  logger.error(err);

  // If it's a custom ApiError, use its status and message
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Otherwise, fallback to 500
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};

export default errorMiddleware;