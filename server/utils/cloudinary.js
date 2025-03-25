const fs = require('fs');
const cloudinary = require('cloudinary');
const AppError = require('./appError');

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadGroupImage = async (localFilePath) => {
  try {
    if (!localFilePath) {
      throw new AppError('No file path provided for upload', 400);
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
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

const deleteImages = async (publicIds) => {
  if (!publicIds?.length) return [];

  try {
    const result = await cloudinary.api.delete_resources(publicIds);
    return result;
  } catch (error) {
    throw new AppError(
      error.message || 'Error deleting images of this group from the cloud',
      500
    );
  }
};

const uploadUserProfilePhoto = async (localFilePath, userId, publicId) => {
  try {
    if (!localFilePath) {
      throw new AppError('No file path provided for upload', 400);
    }

    if (!userId) {
      throw new AppError(
        'User ID is required for uploading profile photos',
        400
      );
    }

    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });

    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    if (localFilePath && fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    throw new AppError(
      error.message || 'Error uploading user profile photo to Cloudinary',
      500
    );
  }
};

module.exports = {
  uploadGroupImage,
  uploadUserProfilePhoto,
  deleteImages,
};
