const fs = require('fs');
const cloudinary = require('../config/cloudinary.config');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.uploadImage = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError('File missing', 404));
  }

  const folderName = 'BirthDate';
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: folderName
  });

  if (result) {
    fs.unlinkSync(req.file.path); // remove local file when uploaded to cloudinary successfull
  }

  res.status(200).json({
    message: 'upload image success',
    file: {
      original_url: result.secure_url,
      advanced_url: cloudinary.url(result.public_id, {
        height: 100,
        width: 100,
        format: 'jpg'
      })
    }
  });
});
