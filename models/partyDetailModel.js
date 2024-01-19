const mongoose = require('mongoose');
const validator = require('validator');

const partyDetailSchema = new mongoose.Schema(
  {},
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const PartyDetail = mongoose.model('PartyDetail', partyDetailSchema);
module.exports = PartyDetail;
