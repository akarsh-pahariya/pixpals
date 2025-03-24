const express = require('express');
const {
  createGroup,
  getGroup,
  getGroupDetails,
} = require('../controllers/groupController');
const { protect } = require('../middlewares/authMiddleware');
const imageRouter = require('./imageRouter');
const {
  requireGroupMembership,
} = require('../middlewares/groupAuthMiddleware');

const Router = express.Router();

Router.route('/:groupId/details').get(
  protect,
  requireGroupMembership,
  getGroupDetails
);
Router.route('/').get(protect, getGroup);
Router.route('/').post(protect, createGroup);

Router.use('/:groupId/image', imageRouter);

module.exports = Router;
