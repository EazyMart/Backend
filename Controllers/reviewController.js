const reviewModel = require("../Models/reviewModel")
const {getAllDocuments, getDocumentById, addDocument, updateDocument, hardDeleteDocument} = require("./Base/baseController");

// @desc    Add user Id to request body
// @route   No
// @access  No
exports.addLoginUserIdToRequestBody = (request, response, next) => {
    request.body.user = request.user.id;
    next();
}

// @desc    Get All Reviews
// @route   GET /Review
// @access  Public
const searchFields = ['comment', 'rating', 'product', 'user'];
exports.getAllReviews = getAllDocuments(reviewModel, 'Reviews', ...searchFields);

// @desc    Get Review by ID
// @route   GET /review/:id
// @access  Public
exports.getReviewById = getDocumentById(reviewModel, 'Review');

// @desc    Create Review
// @route   POST /review
// @access  Private
exports.addReview = addDocument(reviewModel, 'Review');

// @desc    Update Review
// @route   PATCH /review/:id
// @access  Private
const feildsThatAllowToUpdate = ['comment', 'rating', 'available', 'deleted']; //No update for user id or product id
exports.updateReview = updateDocument(reviewModel, 'Review', ...feildsThatAllowToUpdate);

// @desc    Delete Review
// @route   DELETE /review/:id
// @access  Private
exports.deleteReview = hardDeleteDocument(reviewModel, 'Review');
