const express = require('express');
//const { createParty, getAllParties, getPartyInfo, updateParty, deleteParty } = require('../controllers/partyController');
const { createCategory } = require('../controllers/categoryController')
//const partyController = require('../controllers/partyController');
const router = express.Router();

// router.route('/')
//   .get(getAllParties);

router.route('/create')
    .post(createCategory);

// router.route('/details/:id')
//   .get(getPartyInfo)
//   .patch(updateParty)
//   .delete(deleteParty);

module.exports = router;
