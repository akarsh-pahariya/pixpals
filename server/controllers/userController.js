const path = require('path');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const AppError = require('../utils/appError');
const User = require('../models/userModel');
const { uploadUserProfilePhoto } = require('../utils/cloudinary');

const updateUser = async (req, res, next) => {
  try {
    const { name, email, username } = req.body;
    const userId = req.user._id;

    let updateData = { name, email, username };

    if (req.file) {
      const uniqueName = `${Date.now()}-${uuidv4()}.jpeg`;
      const outputPath = path.join(
        __dirname,
        '../public/temp/profile_uploads',
        uniqueName
      );

      const sharp = require('sharp');

      const metadata = await sharp(req.file.buffer).metadata();
      const height = metadata.height;
      const width = metadata.width;

      let cropWidth = width;
      let cropHeight = height;
      let leftOffset = 0;
      let topOffset = 0;

      if (height > width) {
        cropHeight = width;
        topOffset = Math.floor((height - cropHeight) / 2);
      } else if (width > height) {
        cropWidth = height;
        leftOffset = Math.floor((width - cropWidth) / 2);
      }

      await sharp(req.file.buffer)
        .extract({
          left: leftOffset,
          top: topOffset,
          width: cropWidth,
          height: cropHeight,
        })
        .rotate()
        .toFormat('jpeg')
        .jpeg({ quality: 80 })
        .toFile(outputPath);

      const user = await User.findById(userId).select('profilePhoto.publicId');
      const userProfilePhotoPublicId = user?.profilePhoto?.publicId;

      const uploadResponse = await uploadUserProfilePhoto(
        outputPath,
        userId.toString(),
        userProfilePhotoPublicId
      );

      updateData.profilePhoto = {
        url: uploadResponse.secure_url,
        publicId: uploadResponse.public_id,
      };
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return next(new AppError(error.message, 400));
  }
};

module.exports = { updateUser };
