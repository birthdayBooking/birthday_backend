const mongoose = require('mongoose');
const validator = require('validator');

const ReviewSchema = new mongoose.Schema(
  {},
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;
