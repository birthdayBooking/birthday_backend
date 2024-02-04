const express = require('express');
const {
  uploadMultiple, uploadSingle, resizeImage
} = require('../controllers/uploadController');
const { uploadDisk } = require('../config/multer.config');

const router = express.Router();

router.route('/image').post(uploadDisk.single('file'), uploadSingle, resizeImage(200, 200));
router.route('/images').post(uploadDisk.array('files', 3), uploadMultiple, resizeImage(200, 200));

module.exports = router;
 