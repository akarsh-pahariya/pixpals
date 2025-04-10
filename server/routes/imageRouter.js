const express = require('express');
const {
  handleImageUpload,
  getGroupImages,
  getImagesPostedByUser,
  deleteImagesPostedByUser,
} = require('../controllers/imageController');
const router = express.Router({ mergeParams: true });
const { upload } = require('../middlewares/multerMiddleware');
const { protect } = require('../middlewares/authMiddleware');
const {
  requireGroupMembership,
} = require('../middlewares/groupAuthMiddleware');

router
  .post(
    '/',
    protect,
    requireGroupMembership,
    upload.array('images'),
    handleImageUpload
  )
  .get('/', protect, requireGroupMembership, getGroupImages)
  .get('/user', protect, requireGroupMembership, getImagesPostedByUser)
  .post(
    '/user/delete',
    protect,
    requireGroupMembership,
    deleteImagesPostedByUser
  );

module.exports = router;
