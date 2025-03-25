const express = require('express');
const {
  createGroup,
  getGroup,
  getGroupDetails,
  deleteGroup,
  leaveGroup,
} = require('../controllers/groupController');
const { protect } = require('../middlewares/authMiddleware');
const imageRouter = require('./imageRouter');
const {
  requireGroupMembership,
  checkGroupAdmin,
} = require('../middlewares/groupAuthMiddleware');

const Router = express.Router();

Router.route('/:groupId/details').get(
  protect,
  requireGroupMembership,
  getGroupDetails
);
Router.route('/:groupId/leave').delete(
  protect,
  requireGroupMembership,
  leaveGroup
);
Router.route('/:groupId').delete(protect, checkGroupAdmin, deleteGroup);
Router.route('/').get(protect, getGroup);
Router.route('/').post(protect, createGroup);

Router.use('/:groupId/image', imageRouter);

module.exports = Router;
