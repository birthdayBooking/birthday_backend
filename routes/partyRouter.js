const express = require('express');
const { createParty, getAllParties, getPartyInfo, updateParty, deleteParty } = require('../controllers/partyController');
//const partyController = require('../controllers/partyController');
const router = express.Router();

router.route('/')
  .get(getAllParties);

router.route('/create')
  .post(createParty);

router.route('/details/:partyId')
  .get(getPartyInfo)
  .patch(updateParty)
  .delete(deleteParty);

module.exports = router;
