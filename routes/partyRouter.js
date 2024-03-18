const express = require('express');
const { createParty, getAllParties, getPartyInfo, updateParty, deleteParty, getPartyByCategory } = require('../controllers/partyController');
//const partyController = require('../controllers/partyController');
const router = express.Router();

router.route('/')
  .get(getAllParties)
  .post(createParty);
router.route('/:categoryName')
  .get(getPartyByCategory)
router.route('/details/:partyId')
  .get(getPartyInfo)
  .patch(updateParty)
  .delete(deleteParty);

module.exports = router;
