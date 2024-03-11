const express = require('express');
const { getCartItems, addItemToCart, getOrderDetail, updateOrder, deleteOrder, getTotalBookingByDate } = require('../controllers/orderController');
const { protect } = require('../controllers/authController');
const catchAsync = require('../utils/catchAsync');
const router = express.Router();

router
  .route('/')
  .get(getCartItems)
  .post(addItemToCart);
router
  .route('/details/:itemId')
  .get(getOrderDetail)
  .patch(protect,updateOrder)
  .delete(deleteOrder);

router.route('/total-order').get(catchAsync(getTotalBookingByDate));
module.exports = router;