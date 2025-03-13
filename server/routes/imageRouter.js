const express = require('express');
const { handleImageUpload } = require('../controllers/imageController');
const router = express.Router({ mergeParams: true });
const { upload } = require('../middlewares/multerMiddleware');

router.route('/').post(upload.array('images', 5), handleImageUpload);

module.exports = router;
