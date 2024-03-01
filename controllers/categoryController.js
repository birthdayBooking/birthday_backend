const Category = require('../models/categoryModel')
exports.createCategory = async (req, res) => {
    const {name} = req.body
    const newcategory = new Category({name})
    const savedcate = await newcategory.save()
    res.status(200).json(savedcate)
}