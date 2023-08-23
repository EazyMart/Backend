const asyncHandler = require("express-async-handler");
const APIError = require("../Helper/APIError");
const wishlistModel = require("../Models/wishlistModel")
const {getAllDocuments, addDocument, hardDeleteDocument} = require("./baseController");

// @desc    Check If The Wishlist Belongs To The Current User
// @route   No
// @access  No
exports.iSWishlistBelongsToTheCurrentUser = asyncHandler(async (request, response, next) => {
    const wishlist = await wishlistModel.findById(request.params.id, {user: 1});
    if(request.user.id !== wishlist.user) {
        throw new APIError("This wishlist doesn't belongs to the current user", 403);
    }
    next();
});

// @desc    Check If The Wishlist Belongs To The Current User
// @route   No
// @access  No
exports.AddUserIdFromRequestParamsToRequestQuery = asyncHandler(async (request, response, next) => {
    request.query.user = +request.params.userId;
    next();
});

// @desc    Create All Wishlists
// @route   GET /Wishlist
// @access  Private
const searchFields = ['product', 'user'];
exports.getAllWishlists = getAllDocuments(wishlistModel, 'Wishlists', ...searchFields);

// @desc    Create Wishlist
// @route   POST /Wishlist
// @access  Private
exports.addWishlist = addDocument(wishlistModel, 'Wishlist');

// @desc    Delete Wishlist
// @route   DELETE /Wishlist/:id
// @access  Private
exports.deleteWishlist = hardDeleteDocument(wishlistModel, 'Wishlist');
