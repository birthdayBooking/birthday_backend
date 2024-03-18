const Category = require('../models/categoryModel');
const catchAsync = require('../utils/catchAsync');


exports.createCategory = async (req, res) => {
  try {
    const { name, image } = req.body;
    const nameExist = await Category.findOne({ name });
    if (nameExist) {
      return res.status(400).json({ error: `Category named '${name}' already exists` });
    }
    const newCategory = new Category({ name, image });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllCategory = catchAsync(async (req, res) => {
  const data = await Category.find().select('-__v');
  res.status(200).json({
    status: 'success',
    categories: data
  });
});
