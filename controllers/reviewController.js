const Review = require('../models/reviewModel');
const Party = require('../models/partyModel');

const getPartyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ partyId: req.params.partyId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createReview = async (req, res) => {
  const review = new Review({
    partyId: req.params.partyId,
    customerId: req.body.customerId,
    rating: req.body.rating,
    comment: req.body.comment
  });

  try {
    const newReview = await review.save();

    // Cập nhật thông tin party sau khi thêm đánh giá
    await Party.findOneAndUpdate(
      { _id: req.params.partyId },
      {
        $push: { reviews: newReview._id }, // Thêm id của đánh giá vào mảng reviews của party
        $inc: { rating: req.body.rating } // Tăng tổng điểm đánh giá của party
      }
    );

    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
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

const makeReview = async (req, res) => {
  try {
    const { partyId, rating, comment, CustomerId, OrderId } = req.body;

    const party = await Party.findById(partyId);

    if (!party) {
      return res.status(404).json({ error: 'Party not found' });
    }

    const newReview = {
      rating: rating,
      comment: comment,
      CustomerId: CustomerId,
      OrderId: OrderId
    };

    party.reviews.push(newReview);

    const totalRatings = party.reviews.reduce((total, review) => total + review.rating, 0);
    party.rating = totalRatings / party.reviews.length;

    await party.save();

    res.status(200).json({ message: 'Review added successfully', party: party });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports = { getPartyReviews, createReview, deleteReview, makeReview };
