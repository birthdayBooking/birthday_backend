const User = require('../models/account');

exports.getUser = async (req, res) => {
  try {
    const { id: userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.log('Error in User controller: ', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
