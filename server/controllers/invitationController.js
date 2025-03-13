const GroupInvitation = require('../models/groupInvitationModel');
const Group = require('../models/groupModel');
const UserGroupMembership = require('../models/userGroupMembershipModel');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const { addMembersToGroup } = require('../utils/invitationUtils');

const inviteMembersToGroup = async (req, res, next) => {
  try {
    const groupId = req.params.groupId;
    const members = req.body.members;

    const group = await Group.findById(groupId);

    if (group === null)
      return next(new AppError('This is not a valid group ID', 400));

    if (!group.admin.equals(req.user._id))
      return next(
        new AppError('You are not authorized to invite members', 401)
      );

    await addMembersToGroup(group._id, members, req.user.id);
    res.status(201).json({
      status: 'success',
      message:
        'Invitation successfully sent to all the valid members of the group',
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

const declineGroupInvitation = async (req, res, next) => {
  try {
    const groupId = req.params.groupId;

    const invitation = await GroupInvitation.findOneAndDelete({
      groupId,
      recieverId: req.user._id,
    });

    if (!invitation) {
      return next(new AppError('You are not invited to this group', 400));
    }

    res.status(200).json({
      status: 'success',
      message: 'Invitation has been deleted successfully',
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

const acceptGroupInvitation = async (req, res, next) => {
  try {
    const groupId = req.params.groupId;

    const invitation = await GroupInvitation.findOneAndDelete({
      groupId,
      recieverId: req.user._id,
    });

    if (!invitation) {
      return next(new AppError('You are not invited to this group', 400));
    }

    await UserGroupMembership.create({
      userId: req.user._id,
      groupId,
    });

    res.status(200).json({
      status: 'success',
      message: 'You are now a member of the group',
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

const getInvitations = async (req, res, next) => {
  try {
    const userID = req.user._id;

    const invitations = await GroupInvitation.find({ recieverId: userID })
      .populate('groupId', '_id name')
      .populate('senderId', '_id username');

    const formattedInvitations = invitations.map((invitation) => ({
      id: invitation._id,
      group: invitation.groupId
        ? { id: invitation.groupId._id, name: invitation.groupId.name }
        : { id: null, name: 'Unknown Group' },
      senderUsername: invitation.senderId?.username || 'Unknown User',
      invitationDate: invitation.createdAt,
    }));

    res.status(200).json({
      status: 'success',
      data: {
        invitations: formattedInvitations,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

module.exports = {
  acceptGroupInvitation,
  declineGroupInvitation,
  inviteMembersToGroup,
  getInvitations,
};
