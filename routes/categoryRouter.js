const express = require('express');
const { createCategory, getAllCategory } = require('../controllers/categoryController');
const router = express.Router();

// router.route('/')
//   .get(getAllParties);

router.route('/create').post(createCategory);

router.get('/', getAllCategory);

// router.route('/details/:id')
//   .get(getPartyInfo)
//   .patch(updateParty)
//   .delete(deleteParty);

module.exports = router;
