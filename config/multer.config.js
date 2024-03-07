const multer = require('multer');
const AppError  = require('../utils/appError')

const multerStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './dev-data/img');
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
})

const multerFilter = (req, file, cb) => {
  if(file.mimetype.startsWith('image')) {
    cb(null, true) // true mean accepted file
  }else {
    cb(new AppError('invalid file request', 400), false) // pass an error if something goes wrong
  }
}

const uploadDisk = multer({
  storage: multerStorage,
  fileFilter: multerFilter
  // limits: { fileSize: 500000 }
});

module.exports = {
  uploadDisk
};
