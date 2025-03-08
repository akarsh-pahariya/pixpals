const { default: mongoose } = require('mongoose');

const groupInvitationSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Id of sender is required to send the invitation'],
  },
  recieverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Id of reciver is required to send the invitation'],
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: 'Id of the group is required to send the invitation',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const GroupInvitation = mongoose.model(
  'GroupInvitation',
  groupInvitationSchema
);
module.exports = GroupInvitation;
