const multer = require('multer');
const AppError = require('../utils/appError');

const globalErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    let message = 'File upload error';
    if (err.code === 'LIMIT_FILE_COUNT') {
      message = 'You can upload a maximum of 10 images.';
    } else if (err.code === 'LIMIT_FILE_SIZE') {
      message = 'File size too large. Max allowed size per image is 1MB.';
    } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      message = 'You can upload a maximum of 10 images.';
    }

    err = new AppError(message, 400);
  }
  console.log(err);

  res.status(err.statusCode || 500).json({
    status: err.status || 'error',
    message: err.message || 'Internal Server Error',
  });
};

module.exports = globalErrorHandler;
