const Review = require('../models/reviewModel');
const Party = require('../models/partyModel');
const Order = require('../models/orderModel');

const getPartyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ partyId: req.params.partyId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    await review.remove();
    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createReview = async (req, res) => {
  try {
    const { partyId, rating, comment, customerId, OrderId } = req.body;

    const [party, order] = await Promise.all([Party.findById(partyId), Order.findById(OrderId)]);
    console.log(party);
    console.log(order);
    if (!party || !order) {
      return res.status(404).json({ error: 'Party or Order not found' });
    }

    const newReview = {
      rating: rating,
      comment: comment,
      customerId: customerId,
      OrderId: OrderId
    };

    party.reviews.push(newReview);

    const totalRatings = party.reviews.reduce((total, review) => total + review.rating, 0);
    party.rating = totalRatings / party.reviews.length;

    await party.save();

    order.reviews = comment;
    order.rating = rating;

    await order.save();

    res.status(200).json({ message: 'Review added successfully', order: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports = { getPartyReviews, deleteReview, createReview };
