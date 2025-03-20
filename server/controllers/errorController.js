const multer = require('multer');
const AppError = require('../utils/appError');

const globalErrorHandler = (err, req, res, next) => {
  // Check for Multer errors
  if (err instanceof multer.MulterError) {
    let message = 'File upload error';
    if (err.code === 'LIMIT_FILE_COUNT') {
      message = 'You can upload a maximum of 10 images.';
    } else if (err.code === 'LIMIT_FILE_SIZE') {
      message = 'File size too large. Max allowed size is 1MB.';
    }

    err = new AppError(message, 400);
  }

  res.status(err.statusCode || 500).json({
    status: err.status || 'error',
    message: err.message || 'Internal Server Error',
  });
};

module.exports = globalErrorHandler;
