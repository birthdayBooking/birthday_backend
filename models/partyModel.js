const mongoose = require('mongoose');
const validator = require('validator');
//name, category, perks, address, shortDetail, mainDetail, images, maxCustomers, price, rating 
const PartySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    hostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
      validate: {
        validator: async function (hostId) {
          const hostAccount = await mongoose.model('Account').findOne({ _id: hostId, role: 'host' });
          return !!hostAccount;
        },
        message: 'Account Id must belong to a user with role "host"',
      },
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
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Party = mongoose.model('Party', PartySchema);
module.exports = Party;
