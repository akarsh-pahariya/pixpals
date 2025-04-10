const Group = require('../models/groupModel');
const UserGroupMembership = require('../models/userGroupMembershipModel');
const AppError = require('../utils/appError');

const requireGroupMembership = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const userId = req.user._id;

    if (!groupId) {
      return next(new AppError('Group ID is required', 400));
    }

    const isMember = await UserGroupMembership.findOne({ groupId, userId });

    if (!isMember) {
      return next(
        new AppError(
          'You are not authorized to access this group resource',
          403
        )
      );
    }

    req.groupMembership = isMember;
    next();
  } catch (error) {
    next(new AppError('Error verifying group membership', 500));
  }
};

const checkGroupAdmin = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const userId = req.user._id;

    if (!groupId) {
      return next(new AppError('Group ID is required', 400));
    }

    const group = await Group.findOne({
      _id: groupId,
      admin: userId,
    });

    if (!group) {
      return next(
        new AppError(
          'Only group admin is authorized to perform this operation',
          403
        )
      );
    }

    req.group = group;

    next();
  } catch (error) {
    next(new AppError('Error verifying group membership', 500));
  }
};

module.exports = { requireGroupMembership, checkGroupAdmin };
