// routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router
    .get('/party/:partyId/reviews', reviewController.getPartyReviews);

router
    .post('/party/:partyId/reviews', reviewController.createReview);
router
    .delete('/party/:partyId/reviews/:reviewId', reviewController.deleteReview);
module.exports = router;
