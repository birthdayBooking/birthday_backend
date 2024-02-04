const { uploadSingleFile, uploadMultipleFile } = require('../config/cloudinary.config');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const cloudinary = require('cloudinary').v2;

const uploadSingle = catchAsync(async (req, res, next) => {
  const { file } = req;
  if (!file) {
    return next(new AppError('File missing', 404));
  }

  const result = await uploadSingleFile(file);

  req.cloudinaryRes = [result];

  next();
});

const uploadMultiple = catchAsync(async (req, res, next) => {
  const { files } = req;
  if (!files) {
    return next(new AppError('File missing', 404));
  }

  const result = await uploadMultipleFile(files);

  req.cloudinaryRes = result;

  next();
});

const resizeImage = (h, w) => {
  return (req, res, next) => {
    const { cloudinaryRes } = req;

    // console.log(cloudinaryRes);

    const resized = cloudinaryRes.map(image => {
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

    next()
  };
};

module.exports = {
  uploadMultiple,
  uploadSingle,
  resizeImage
};
