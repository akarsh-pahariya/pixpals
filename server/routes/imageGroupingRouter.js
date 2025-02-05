const express = require('express');
const router = express.Router();
const {
  uploadImages,
  groupImages,
} = require('../controllers/imageGroupingController');

router.route('/').post(uploadImages, groupImages);

module.exports = router;
