const mongoose = require('mongoose');
const { Schema } = mongoose;
// const validator = require('validator');

//name, category, perks, address, shortDetail, mainDetail, images, maxCustomers, price, rating
const reviewSchema = new Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      require: true
    },
    comment: {
      type: String,
      require: true
    },
    CustomerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
      required: true
    },
    OrderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true
    }
  },
  { timestamps: true }
);
const PartySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    hostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
      validate: {
        validator: async function(hostId) {
          const hostAccount = await mongoose.model('Account').findOne({ _id: hostId, role: 'host' });
          return !!hostAccount;
        },
        message: 'Account Id must belong to a user with role "host"'
      }
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    perks: [String],
    address: { type: String, required: true },
    shortDetail: String,
    mainDetail: String,
    images: [String],
    maxCustomers: { type: Number, required: true },
    price: { type: Number, required: true },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    reviews: [reviewSchema]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
  }
);

const Party = mongoose.model('Party', PartySchema);
module.exports = Party;
