const express = require('express');
const { createService, getAllServices, getServiceInfo, updateService, deleteService } = require('../controllers/serviceController');
//const partyController = require('../controllers/partyController');
const router = express.Router();

router.route('/')
  .get(getAllServices);

router.route('/create')
  .post(createService);

router.route('/details/:serviceId')
  .get(getServiceInfo)
  .patch(updateService)
  .delete(deleteService);

module.exports = router;
