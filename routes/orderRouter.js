const express = require('express');
const { getCartItems, addItemToCart, getOrderDetail, updateOrder, deleteOrder } = require('../controllers/orderController');
const { protect } = require('../controllers/authController');
const router = express.Router();

router.route('/')
    .get(getCartItems)
    .post(addItemToCart)
router.route('/details/:itemId')
    .get(getOrderDetail)
    .patch(protect,updateOrder)
    .delete(deleteOrder)
module.exports = router;
