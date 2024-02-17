const express = require('express');
const { uploadSingleToCloud, resizeImage, uploadMultipleToCloud } = require('../controllers/uploadController');
const { uploadDisk } = require('../config/multer.config');

const router = express.Router();

router.route('/image').post(uploadDisk.single('file'), uploadSingleToCloud, resizeImage(200, 200));
router.route('/images').post(uploadDisk.array('files', 3), uploadMultipleToCloud, resizeImage(200, 200));

module.exports = router;
