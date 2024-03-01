const mongoose = require('mongoose');
//const validator = require('validator');

const orderSchema = new mongoose.Schema(
  {
    partyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Party',
      required: true
    },
    extraService: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service'
    },
    discount: Number,
    total: {
      type: Number,
      required: true
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
