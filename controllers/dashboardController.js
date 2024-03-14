const Account = require('../models/account');
const Order = require('../models/orderModel');
const Party = require('../models/partyModel');
const { getSelectData, getDate } = require('../utils');

function getDateSelection(date) {
  let startDate;
  let endDate;
  let dateSelected;

  if (date.includes(',')) {
    startDate = new Date(date.split(',')[0]);
    endDate = new Date(date.split(',')[1]);
    endDate.setDate(endDate.getDate() + 1);
    dateSelected = { $gte: startDate, $lte: endDate };
  } else {
    dateSelected = { $eq: new Date(date) };
  }

  return dateSelected
}

const getAnalyticsOfSystem = async (req, res) => {
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

const getPartyStats = async (req, res) => {
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

const getTopBookingParty = async (req, res) => {
  const limitNumber = req.query.top;

  // (1)   aggregate number of party id in order,
  // (1.1) sort desc
  // (1.2) limit response to get top
  const mostPopularBookingParty = await Order.aggregate([
    {
      $group: {
        _id: '$partyId',
        numsParty: { $sum: 1 },
        partyId: { $first: '$partyId' }
      }
    },
    {
      $sort: {
        numsParty: -1
      }
    },
    {
      $limit: +limitNumber || 1
    }
  ]);

  // (2) query party by id
  const listParty = mostPopularBookingParty.map(item => {
    return Party.findById(item._id)
      .lean()
      .select(getSelectData(['name', 'price', 'rating', 'createdAt']));
  });

  const topBookingParty = await Promise.all(listParty);

  // (3) return result
  res.status(200).json({
    status: 'success',
    total: topBookingParty.length,
    topBookingParty
  });
};

const getMonthlyBooking = async (req, res) => {
  const year = req.params.year * 1;

  const plan = await Order.aggregate([
    {
      $match: {
        orderDate: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`)
        }
      }
    },
    {
      $group: {
        _id: { $month: '$orderDate' },
        numsParty: { $sum: 1 },
        partys: { $push: '$_id' }
      }
    },
    {
      $addFields: { month: '$_id' }
    },
    {
      $project: {
        _id: false
      }
    }
  ]);

  res.status(200).json({
    status: 'success',
    total: plan.length,
    plan
  });
};

const getTopParty = async (req, res, next) => {
  const topParty = await Party.aggregate([
    {
      $sort: { price: 1 }
    }
  ]);

  res.status(200).json({
    status: 'success',
    total: topParty.length,
    topParty
  });
};

const getTotalBookingByDate = async (req, res, next) => {
  const { date } = req.query;

  const dateSelection = getDateSelection(date);

  // console.log(dateSelection)
  const totalBooking = await Order.aggregate([
    {
      $match: { orderDate: dateSelection }
    },
    {
      $group: {
        _id: null,
        totalOrders: { $sum: 1 }
      }
    }
  ]);
  res.status(200).json({
    status: 'success',
    stats: totalBooking
  });
};

const getTotalRevanueByDate = async (req, res, next) => {
  const { date } = req.query;

  const dateSelection = getDateSelection(date);

  const revanue = await Order.aggregate([
    {
      $match: { orderDate: dateSelection }
    },
    {
      $group: {
        _id: null,
        totalRevanue: { $sum: '$total' },
        // revanueByGr: { $push: '$total' }
      }
    }
  ]);

  res.status(200).json({
    status: 'success',
    stats: revanue
  });
};



module.exports = {
  getAnalyticsOfSystem,
  getPartyStats,
  getTopBookingParty,
  getMonthlyBooking,
  getTopParty,
  getTotalRevanueByDate,
  getTotalBookingByDate
};
