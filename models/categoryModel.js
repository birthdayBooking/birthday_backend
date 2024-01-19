const mongoose = require('mongoose');
const validator = require('validator');
const categorySchema = new mongoose.Schema({
{},
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
});

const Category = mongoose.model('Category', hostSchema);
module.exports = Category;