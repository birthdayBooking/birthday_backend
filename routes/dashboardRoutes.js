const express = require('express');
const { getAnalyticsOfSystem, getPartyStats, getTopBookingParty, getMonthlyBooking, getTopParty } = require('../controllers/dashboardController');
const catchAsync = require('../utils/catchAsync');

const router = express.Router();

router.route('/').get(catchAsync(getAnalyticsOfSystem));
router.route('/party').get(catchAsync(getPartyStats));
router.route('/hot-party').get(catchAsync(getTopBookingParty));
router.route('/monthly-booking/:year').get(catchAsync(getMonthlyBooking));
router.route('/top-party').get(catchAsync(getTopParty));

module.exports = router;
