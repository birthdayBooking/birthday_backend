const mongoose = require('mongoose');
//const validator = require('validator');

const orderSchema = new mongoose.Schema(
  {
    customerId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
      required: true
    },
    partyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Party',
      required: true
    },
    extraService: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service'
    }],
    total: {
      type: Number,
      required: true
    },
    orderDate: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'cancelled'],
      default: 'pending'
    },
    paymentMethod:  String,
    notes: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
