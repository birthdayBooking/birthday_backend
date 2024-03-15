const express = require('express');
const { createCategory, getAllCategory } = require('../controllers/categoryController');
const router = express.Router();

router.route('/create').post(createCategory);

router.get('/', getAllCategory);


module.exports = router;
