const express = require('express');
const { getCartItems, addItemToCart, getOrderDetail, updateOrder, deleteOrder, createOrder } = require('../controllers/orderController');
const { protect } = require('../controllers/authController');
const router = express.Router();

router
  .route('/')
  .get(getCartItems)
  .post(addItemToCart);
router
  .route('/details/:itemId')
  .get(getOrderDetail)
  .patch(protect, updateOrder)
  .delete(deleteOrder);
router
  .route('/total-order')
  .get(catchAsync(getTotalBookingByDate));

router
  .route('/create')
  .post(createOrder); 

module.exports = router;
