const multer = require('multer');
const AppError = require('../utils/appError');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedFormats = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/heif',
  ];

  if (allowedFormats.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        'Invalid file type. Only JPEG, PNG, WebP, and HEIF are allowed.',
        400
      ),
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1 * 1024 * 1024, files: 10 },
});

module.exports = { upload };
