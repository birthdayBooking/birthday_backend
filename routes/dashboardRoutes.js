const express = require('express');
const { getAnalyticsOfSystem, getPartyStats, getHighestBookingParty, getMonthlyBooking } = require('../controllers/dashboardController');
const catchAsync = require('../utils/catchAsync');

const router = express.Router();

router.route('/').get(catchAsync(getAnalyticsOfSystem));
router.route('/party').get(catchAsync(getPartyStats));
router.route('/hot-party').get(catchAsync(getHighestBookingParty));
router.route('/monthly-booking/:year').get(catchAsync(getMonthlyBooking));
//   .post(dashboardController.createUser);

// router
//   .route('/:id')
//   .get(dashboardController.getUser)
//   .patch(dashboardController.updateUser)
//   .delete(dashboardController.deleteUser);

module.exports = router;
