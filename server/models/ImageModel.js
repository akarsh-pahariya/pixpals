const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  secureURL: { type: String, required: [true, 'URL of the image is required'] },
  publicId: {
    type: String,
    required: [true, 'Public Id of the image is required'],
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Image', ImageSchema);
