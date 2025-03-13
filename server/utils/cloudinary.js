const fs = require('fs');
const cloudinary = require('cloudinary');

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.v2.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });

    console.log('File has been uploaded successfully');
    console.log(response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); //Remove the locally saved temporary file as the upload got failed
    return null;
  }
};

module.exports = { uploadOnCloudinary };
