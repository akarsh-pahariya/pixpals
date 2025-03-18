const path = require('path');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const AppError = require('../utils/appError');
const { uploadGroupImage } = require('../utils/cloudinary');
const Image = require('../models/ImageModel');

const handleImageUpload = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const userId = req.user._id;

    if (!req.files || req.files.length === 0) {
      return next(new AppError('No images uploaded', 400));
    }

    const processedImages = await Promise.all(
      req.files.map(async (file) => {
        if (!file.buffer) {
          throw new AppError(`File ${file.originalname} is corrupted`, 400);
        }

        const uniqueName = `${Date.now()}-${uuidv4()}.jpeg`;
        const outputPath = path.join(
          __dirname,
          '../public/temp/group_uploads',
          uniqueName
        );

        await sharp(file.buffer)
          .rotate()
          .toFormat('jpeg')
          .jpeg({ quality: 80 })
          .toFile(outputPath);

        const uploadResponse = await uploadGroupImage(outputPath, groupId);

        const imageObj = {
          secureURL: uploadResponse.secure_url,
          publicId: uploadResponse.public_id,
          userId,
          groupId,
        };
        const databaseResponse = await Image.create(imageObj);
        return databaseResponse;
      })
    );

    res.status(200).json({
      status: 'success',
      images: processedImages,
    });
  } catch (error) {
    return next(new AppError(error.message || 'Error processing images', 500));
  }
};

const getGroupImages = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = 100;

    const groupImages = await Image.find({ groupId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json({
      status: 'success',
      data: {
        results: groupImages.length,
        page: parseInt(page),
        images: groupImages,
      },
    });
  } catch (error) {
    return next(
      new AppError(error.message || 'Cannot fetch group images right now', 500)
    );
  }
};

module.exports = { handleImageUpload, getGroupImages };
