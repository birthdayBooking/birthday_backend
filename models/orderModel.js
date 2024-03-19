const mongoose = require('mongoose');
//const validator = require('validator');

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
      required: true
    },
    partyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Party',
      required: true
    },
    extraService: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
      }
    ],
    time: {
      type: String
    },
    total: {
      type: Number,
      required: true
    },
    orderDate: {
      type: Date
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'cancelled'],
      default: 'pending'
    },
    prepare: {
      type: String,
      enum: ['waiting', 'success'],
      default: 'waiting'
    },
    paymentMethod: String,
    notes: String,
    reviews: {
      type: String
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
  }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
