const Account = require('../models/account');

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    message: 'abc'
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
    console.log(data);
    const result = await Account.create(data);
    console.log(result);
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
  const { id } = req.params;

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
