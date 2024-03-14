const express = require('express');
const {
  getAnalyticsOfSystem,
  getPartyStats,
  getTopBookingParty,
  getMonthlyBooking,
  getTopParty,
  getTotalBookingByDate,
  getTotalRevanueByDate
} = require('../controllers/dashboardController');
const catchAsync = require('../utils/catchAsync');

const router = express.Router();

router.route('/user').get(catchAsync(getAnalyticsOfSystem));
router.route('/party').get(catchAsync(getPartyStats));
router.route('/hot-party').get(catchAsync(getTopBookingParty));
router.route('/monthly-booking/:year').get(catchAsync(getMonthlyBooking));
router.route('/top-cheap-party').get(catchAsync(getTopParty));

router.route('/total-order').get(catchAsync(getTotalBookingByDate));
router.route('/total-revanue').get(catchAsync(getTotalRevanueByDate));

module.exports = router;
