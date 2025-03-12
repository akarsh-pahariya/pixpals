const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const {
  inviteMembersToGroup,
  acceptGroupInvitation,
  declineGroupInvitation,
  getInvitations,
} = require('../controllers/invitationController');

const Router = express.Router();

Router.route('/').get(protect, getInvitations);
Router.route('/:groupId').post(protect, inviteMembersToGroup);
Router.route('/:groupId/accept').get(protect, acceptGroupInvitation);
Router.route('/:groupId/decline').delete(protect, declineGroupInvitation);

module.exports = Router;
