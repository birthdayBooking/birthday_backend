const mongoose = require('mongoose');
const validator = require('validator');

const PartySchema = new mongoose.Schema({
  {},
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
});

const Party = mongoose.model('Party', orderSchema);
module.exports = Party;