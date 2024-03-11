const Account = require('../models/account');
const Party = require('../models/partyModel');

const getAnalyticsOfSystem = async (req, res, next) => {
  const memberCount = await Account.find({ role: 'member' }).count();
  const admin = await Account.find({ role: 'admin' }).count();
  const host = await Account.find({ role: 'host' }).count();

  res.status(200).json({
    stats: {
      numMembers: memberCount,
      numAdmins: admin,
      numHosts: host
    }
  });
};

const getPartyStats = async (req, res, next) => {
  const partyStats = await Party.aggregate([
    {
      $group: {
        _id: null,
        numPartys: { $sum: 1 },
        avgRating: { $avg: '$rating' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' }
      }
    },
    {
      $sort: {
        avgRating: 1
      }
    }
  ]);
  res.status(200).json({
    status: 'success',
    partyStats
  });
};

module.exports = {
  getAnalyticsOfSystem,
  getPartyStats
};
