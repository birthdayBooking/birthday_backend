const express = require('express');
const { getAnalyticsOfSystem, getPartyStats, getHighestBookingParty } = require('../controllers/dashboardController');
const catchAsync = require('../utils/catchAsync');

const router = express.Router();

router.route('/').get(catchAsync(getAnalyticsOfSystem));
router.route('/party').get(catchAsync(getPartyStats));
router.route('/hot-party').get(catchAsync(getHighestBookingParty));
//   .post(dashboardController.createUser);

// router
//   .route('/:id')
//   .get(dashboardController.getUser)
//   .patch(dashboardController.updateUser)
//   .delete(dashboardController.deleteUser);

module.exports = router;