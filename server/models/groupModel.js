const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Group name is required'],
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        min: [1, 'Group must have at least one member'],
        required: [true, 'At least 1 member in the group is required'],
      },
    ],
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Group admin is required'],
    },
  },
  { timestamps: true }
);

groupSchema.methods.toJSON = function () {
  const group = this.toObject();
  delete group.__v;
  group.id = group._id;
  delete group._id;
  return group;
};

const Group = mongoose.model('Group', groupSchema);
module.exports = Group;
