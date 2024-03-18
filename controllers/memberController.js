const Account = require('../models/account');
const { unselectData } = require('../utils');

exports.getAllUsers = async (req, res) => {
  const users = await Account.find().select(unselectData(['id', '__v']));
  res.status(200).json({
    status: 'success',
    users
  });
};

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};

exports.createUser = async (req, res) => {
  try {
    const data = req.body;
    // Check if the user already exists based on a unique identifier (e.g., username)
    const existingUser = await Account.findOne({ email: data.email });

    if (existingUser) {
      // If the user already exists, return the existing user
      return res.status(200).json(existingUser);
    }
    const result = await Account.create(data);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};

exports.updateUser = async (req, res, next) => {
  // const { id } = req.params;

  console.log(req.body);

  // const updatedUser = await User.findByIdAndUpdate(id, )

  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};
