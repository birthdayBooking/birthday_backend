const express = require('express');
const { uploadImage } = require('../controllers/uploadController');
const { uploadDisk } = require('../config/multer.config');

const router = express.Router();

router.route('/image').post(uploadDisk.single('file'), uploadImage);

module.exports = router;
