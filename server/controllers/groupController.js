const Group = require('../models/groupModel');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const UserGroupMembership = require('../models/userGroupMembershipModel');
const { addMembersToGroup } = require('../utils/invitationUtils');
const Image = require('../models/ImageModel');
const GroupInvitation = require('../models/groupInvitationModel');
const { deleteImages } = require('../utils/cloudinary');
const { default: mongoose } = require('mongoose');

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

const getGroup = async (req, res, next) => {
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

const getGroupDetails = async (req, res, next) => {
  try {
    const { groupId } = req.params;

    const [group, groupImageCounts, invitationCount, users] = await Promise.all(
      [
        Group.findById(groupId).select('createdAt admin name'),
        Image.countDocuments({ groupId }),
        GroupInvitation.countDocuments({ groupId }),
        UserGroupMembership.find({ groupId }).populate(
          'userId',
          'username name createdAt'
        ),
      ]
    );

    if (!group) {
      return next(new AppError('Group not found', 404));
    }

    const admin = await User.findById(group.admin).select(
      'username name createdAt'
    );

    const userIds = users.map((user) => user.userId._id);

    const groupObjectId = new mongoose.Types.ObjectId(groupId);
    const userImageCounts = await Image.aggregate([
      {
        $match: {
          groupId: groupObjectId,
          userId: { $in: userIds },
        },
      },
      { $group: { _id: '$userId', count: { $sum: 1 } } },
    ]);

    const imageCountMap = userImageCounts.reduce((acc, { _id, count }) => {
      acc[_id.toString()] = count;
      return acc;
    }, {});

    const response = {
      status: 'success',
      data: {
        admin: {
          username: admin.username,
          name: admin.name,
          createdAt: admin.createdAt,
          groupCreatedAt: group.createdAt,
        },
        groupInfo: {
          membersCount: users.length,
          imagesPosted: groupImageCounts,
          invitations: invitationCount,
          groupName: group.name,
        },
        groupMembers: users.map((user) => ({
          username: user.userId.username,
          name: user.userId.name,
          joinedAt: user.joinedAt,
          imagesPosted: imageCountMap[user.userId._id.toString()] || 0,
        })),
      },
    };

    res.status(200).json(response);
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const deleteGroup = async (req, res, next) => {
  try {
    const groupId = req.group._id;

    const [imagesData] = await Promise.all([
      Image.find({ groupId }).select('publicId'),
      Group.findByIdAndDelete(groupId),
      UserGroupMembership.deleteMany({ groupId }),
      GroupInvitation.deleteMany({ groupId }),
    ]);

    const publicIds = imagesData.map((image) => image.publicId);

    await Promise.all([deleteImages(publicIds), Image.deleteMany({ groupId })]);

    res.status(200).json({
      status: 'success',
      message: 'Group and all associated data deleted successfully',
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const leaveGroup = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const groupId = req.params.groupId;

    const group = await Group.findById(groupId);
    if (group.admin.equals(userId))
      return next(new AppError('Admin cannot leave the group', 400));

    const userImages = await Image.find({
      userId,
      groupId,
    }).select('publicId');

    if (!userImages.length) {
      await UserGroupMembership.findOneAndDelete({ userId, groupId });

      return res.status(200).json({
        status: 'success',
        message: 'Successfully left the group',
      });
    }

    const publicIds = userImages.map((image) => image.publicId);

    await Promise.all([
      UserGroupMembership.findOneAndDelete({ userId, groupId }),
      Image.deleteMany({ userId, groupId }),
      deleteImages(publicIds),
    ]);

    res.status(200).json({
      status: 'success',
      message: 'Successfully left the group and cleaned up all resources',
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

module.exports = {
  getGroup,
  createGroup,
  getGroupDetails,
  deleteGroup,
  leaveGroup,
};
