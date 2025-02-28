const AppError = require('../utils/appError');
const User = require('../models/userModel');

const declineGroupInvite = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const user = req.user;

    if (!user.pendingRequests.includes(groupId)) {
      return next(new AppError('You have not been invited to this group', 400));
    }

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        $pull: { pendingRequests: groupId },
      },
      { new: true }
    );

    res.status(200).json({
      status: 'success',
      data: { updatedUser },
    });
  } catch (err) {
    return next(new AppError(err.message, 400));
  }
};

module.exports = { declineGroupInvite };
