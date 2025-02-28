const Group = require('../models/groupModel');
const User = require('../models/userModel');
const AppError = require('../utils/appError');

const addMembersToGroup = async (group, members) => {
  try {
    const eligibleUsers = await User.find({
      _id: { $in: members },
      pendingRequests: { $ne: group.id },
      _id: { $nin: group.members },
    }).select('_id');

    const eligibleUserIds = eligibleUsers.map((user) => user._id);

    if (eligibleUserIds.length <= 0) {
      throw new Error(
        'Either the users are already in the group or are invited'
      );
    }

    await User.updateMany(
      { _id: { $in: eligibleUserIds } },
      { $push: { pendingRequests: group.id } }
    );
  } catch (error) {
    throw new Error(
      'Failed to send invitation to the users to join the group. Please try again.'
    );
  }
};

const inviteMembersToGroup = async (req, res, next) => {
  try {
    const groupId = req.params.groupId;
    const members = req.body.members;

    const group = await Group.findById(groupId);
    if (!req.user.adminGroups.includes(groupId)) {
      return next(
        new AppError('You are not authorized to invite members', 401)
      );
    }

    await addMembersToGroup(group, members);
    res
      .status(201)
      .json({ status: 'success', message: 'Invitation sent successfully' });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

const acceptGroupInvitation = async (req, res, next) => {
  try {
    const groupId = req.params.groupId;
    if (!req.user.pendingRequests.includes(groupId)) {
      return next(new AppError('You are not invited to this group', 400));
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { pendingRequests: groupId } },
      { new: true }
    );

    await Group.findByIdAndUpdate(
      groupId,
      { $push: { members: req.user.id } },
      { new: true }
    );

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

const createGroup = async (req, res, next) => {
  try {
    const groupDetails = {
      name: req.body.name,
      members: req.user.id,
      admin: req.user.id,
    };

    const group = await Group.create(groupDetails);
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $push: { memberGroups: group.id, adminGroups: group.id } },
      { new: true }
    );
    addMembersToGroup(group, req.body.members);

    res.status(201).json({
      status: 'success',
      data: {
        group,
        user,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

module.exports = { createGroup, inviteMembersToGroup, acceptGroupInvitation };
