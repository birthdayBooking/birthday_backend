const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema(
  {
    customName: {
      type: String
    },
    accountId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Account'
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Member = mongoose.model('Member', memberSchema);
module.exports = Member;
