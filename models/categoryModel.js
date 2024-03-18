const mongoose = require('mongoose');
//const validator = require('validator');
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    image: String

  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
