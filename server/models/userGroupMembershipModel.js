const mongoose = require('mongoose');

const userGroupMembershipSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Id of the user is required to be able to join the group'],
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: [
      true,
      'Id of the group is required to be able to join the group',
    ],
  },
  role: {
    type: String,
    enum: ['member', 'admin'],
    default: 'member',
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

const UserGroupMembership = mongoose.model(
  'UserGroupMembership',
  userGroupMembershipSchema
);

module.exports = UserGroupMembership;
