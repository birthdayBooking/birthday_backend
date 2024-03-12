const Account = require('../models/account');
const Order = require('../models/orderModel');
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

const getHighestBookingParty = async (req, res, next) => {
  const partyStats = await Order.aggregate([
    {
      $group: {
        _id: '$partyId',
        count: { $sum: 1 }
      }
    },
    {
      $sort: {
        count: -1
      }
    },
    {
      $limit: 1
    }
  ]);

  const { _id } = partyStats[0];

  const party = await Party.findById(_id).lean()

  res.status(200).json({
    party
  });
};

module.exports = {
  getAnalyticsOfSystem,
  getPartyStats,
  getHighestBookingParty
};
