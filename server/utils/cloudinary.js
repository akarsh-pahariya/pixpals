const fs = require('fs');
const cloudinary = require('cloudinary');
const AppError = require('./appError');

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadGroupImage = async (localFilePath, groupId) => {
  try {
    if (!localFilePath) {
      throw new AppError('No file path provided for upload', 400);
    }

    if (!groupId) {
      throw new AppError('Group ID is required for uploading images', 400);
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      folder: `group_uploads/${groupId}`,
      resource_type: 'auto',
    });

    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    if (localFilePath && fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    throw new AppError(
      error.message || 'Error uploading image to Cloudinary',
      500
    );
  }
};

module.exports = { uploadGroupImage };
