const reviewModel = require("../Models/reviewModel")
const {getAllDocuments, getDocumentById, addDocument, updateDocument, hardDeleteDocument} = require("./baseController");

exports.addLoginUserIdToRequestBody = (request, response, next) => {
    request.body.user = request.user.id;
    next();
}

// @desc    Create All Reviews
// @route   GET /Review
// @access  Public
const searchFields = ['comment', 'rating', 'product', 'user'];
exports.getAllReviews = getAllDocuments(reviewModel, 'Reviews', ...searchFields);

// @desc    Create Review by ID
// @route   GET /Review/:id
// @access  Public
exports.getReviewById = getDocumentById(reviewModel, 'Review');

// @desc    Create Review
// @route   POST /Review
// @access  Private
exports.addReview = addDocument(reviewModel, 'Review');

// @desc    Update Review
// @route   PATCH /Review/:id
// @access  Private
const properties = ['comment', 'rating', 'available', 'deleted']; //No update for user id or product id
exports.updateReview = updateDocument(reviewModel, 'Review', ...properties);

// @desc    Delete Review
// @route   DELETE /Review/:id
// @access  Private
exports.deleteReview = hardDeleteDocument(reviewModel, 'Review');
