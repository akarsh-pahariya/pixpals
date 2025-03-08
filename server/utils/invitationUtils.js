const GroupInvitation = require('../models/groupInvitationModel');
const UserGroupMembership = require('../models/userGroupMembershipModel');
const User = require('../models/userModel');

const addMembersToGroup = async (currentGroupId, members, adminId) => {
  try {
    const userIds = await User.find({
      username: { $in: members },
    }).select('_id');
    const userIdsArray = userIds.map((user) => user._id);

    const existingMember = await UserGroupMembership.find({
      userId: { $in: userIdsArray },
      groupId: currentGroupId,
    }).select('userId');
    const existingMemberIds = existingMember.map((member) => member.userId);

    const alreadyInvitedUsers = await GroupInvitation.find({
      recieverId: { $in: userIdsArray },
      groupId: currentGroupId,
    }).select('recieverId');
    const alreadyInvitedUserIds = alreadyInvitedUsers.map(
      (member) => member.recieverId
    );

    const filteredUserIds = userIdsArray.filter(
      (id) =>
        !existingMemberIds.some((memberId) => memberId.equals(id)) &&
        !alreadyInvitedUserIds.some((invitedId) => invitedId.equals(id))
    );

    if (filteredUserIds.length === 0) return;

    await GroupInvitation.insertMany(
      filteredUserIds.map((id) => ({
        senderId: adminId,
        groupId: currentGroupId,
        recieverId: id,
      }))
    );

    return;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { addMembersToGroup };
