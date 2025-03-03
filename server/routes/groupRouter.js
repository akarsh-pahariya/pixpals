const express = require('express');
const {
  createGroup,
  inviteMembersToGroup,
  acceptGroupInvitation,
  getGroupDetails,
} = require('../controllers/groupController');
const { protect } = require('../middlewares/authMiddleware');

const Router = express.Router();

Router.route('/').get(protect, getGroupDetails);
Router.route('/').post(protect, createGroup);
Router.route('/:groupId/invite').post(protect, inviteMembersToGroup);
Router.route('/:groupId/accept-invite').get(protect, acceptGroupInvitation);

module.exports = Router;
