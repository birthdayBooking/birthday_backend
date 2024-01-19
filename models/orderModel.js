const mongoose = require('mongoose');
const validator = require('validator');

const orderSchema = new mongoose.Schema({
  {},
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;