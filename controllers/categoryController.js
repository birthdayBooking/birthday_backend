const Category = require('../models/categoryModel');
const catchAsync = require('../utils/catchAsync');
exports.createCategory = async (req, res) => {
  const { name } = req.body;
  const newcategory = new Category({ name });
  const savedcate = await newcategory.save();
  res.status(200).json(savedcate);
};

exports.getAllCategory = catchAsync(async (req, res) => {
  const data = await Category.find().select('-__v');
  res.status(200).json({
    status: 'success',
    categories: data
  });
});
