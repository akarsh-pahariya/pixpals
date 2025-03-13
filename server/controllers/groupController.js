const Group = require('../models/groupModel');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const UserGroupMembership = require('../models/userGroupMembershipModel');
const { addMembersToGroup } = require('../utils/invitationUtils');

const createGroup = async (req, res, next) => {
  try {
    const groupDetails = {
      name: req.body.name,
      admin: req.user.id,
    };
    const group = await Group.create(groupDetails);

    const userGroupMembershipDetails = {
      userId: req.user.id,
      groupId: group._id,
      role: 'admin',
    };
    await UserGroupMembership.create(userGroupMembershipDetails);
    await addMembersToGroup(group._id, req.body.members, req.user.id);

    res.status(201).json({
      status: 'success',
      data: {
        group,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

const getGroupDetails = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const joinedGroups = await UserGroupMembership.find({ userId })
      .populate('groupId', '-__v')
      .select('groupId');

    const groupsInfo = joinedGroups.map((membership) => membership.groupId);

    res.status(200).json({
      status: 'success',
      data: { groups: groupsInfo },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

module.exports = {
  getGroupDetails,
  createGroup,
};
