const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Group name is required'],
    },
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
