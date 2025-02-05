const multer = require('multer');

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload an image.'), false);
  }
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
const uploadImages = upload.array('images', 5);

const groupImages = async (req, res) => {
  console.log(req.files);
  res.status(200).json({ message: 'Group images' });
};

module.exports = { groupImages, uploadImages };
