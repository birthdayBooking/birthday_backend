const express = require('express');
const orderController = require('./../controllers/orderController')
const { protect } = require('../controllers/authController');
const catchAsync = require('../utils/catchAsync');
const router = express.Router();

router
  .route('/')
  .get(orderController.getCartItems)
  .post(orderController.addItemToCart);
router
  .route('/details/:itemId')
  .get(orderController.getOrderDetail)
  .patch(protect, orderController.updateOrder)
  .delete(orderController.deleteOrder);
router
  .route('/total-order')
  .get(catchAsync(orderController.getTotalBookingByDate));

router
  .route('/create')
  .post(orderController.createOrder);
router
.route('/getByIdCustomer/:customerId')
.get(orderController.getOrderByCustomerId)
router
.route('/getOrderDetail/:orderId')
.get(orderController.getOrderDetail)
router
  .post('/orders/addService', orderController.addServiceToOrder);
router
  .put('/:orderId/prepare', orderController.updatePrepareStatus);
module.exports = router;
