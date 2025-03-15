const express = require('express');
const {
  handleImageUpload,
  getGroupImages,
} = require('../controllers/imageController');
const router = express.Router({ mergeParams: true });
const { upload } = require('../middlewares/multerMiddleware');
const { protect } = require('../middlewares/authMiddleware');
const {
  requireGroupMembership,
} = require('../middlewares/groupAuthMiddleware');

router
  .post('/', protect, requireGroupMembership, (req, res, next) => {
    upload.array('images', 10)(req, res, (err) => {
      if (err) {
        return next(err);
      }
      handleImageUpload(req, res, next);
    });
  })
  .get('/', protect, requireGroupMembership, getGroupImages);

module.exports = router;
