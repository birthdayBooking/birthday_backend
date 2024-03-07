const cloudinary = require('cloudinary').v2;
const { uploadSingleFile, uploadMultipleFile } = require('../config/cloudinary.config');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const uploadSingleToCloud = catchAsync(async (req, res, next) => {
  const { file } = req;
  if (!file) {
    return next(new AppError('File missing', 404));
  }

  const result = await uploadSingleFile(file);

  req.cloudinaryResponse = [result];

  next();
});

const uploadMultipleToCloud = catchAsync(async (req, res, next) => {
  const { files } = req;
  if (!files) {
    return next(new AppError('File missing', 404));
  }

  const result = await uploadMultipleFile(files);

  req.cloudinaryResponse = result;

  next();
});

const resizeImage = (h, w) => {
  return (req, res, next) => {
    const { cloudinaryResponse } = req;

    // console.log(cloudinaryResponse);

    const resized = cloudinaryResponse.map(image => {
      return {
        original_url: image.secure_url,
        resized_url: cloudinary.url(image.public_id, {
          height: h,
          width: w,
          crop: 'scale',
          format: 'jpg'
        })
      };
    });

    req.images = resized;

    res.json({
      resized
    })

    // next()
  };
};

module.exports = {
  uploadMultipleToCloud,
  uploadSingleToCloud,
  resizeImage
};
