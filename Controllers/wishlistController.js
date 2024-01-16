const asyncHandler = require("express-async-handler");
const APIError = require("../ErrorHandler/APIError");
const wishlistModel = require("../Models/wishlistModel")
const {getAllDocuments, addDocument, hardDeleteDocument} = require("./Base/baseController");

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

// @desc    Get All Wishlists
// @route   GET /user/:userId/wishlist
// @access  Private
const searchFields = ['product', 'user'];
exports.getAllWishlists = getAllDocuments(wishlistModel, 'Wishlists', ...searchFields);

// @desc    Create Wishlist
// @route   POST /user/:userId/wishlist
// @access  Private
exports.addWishlist = addDocument(wishlistModel, 'Wishlist');

// @desc    Delete Wishlist
// @route   DELETE /user/:userId/wishlist/:id
// @access  Private
exports.deleteWishlist = hardDeleteDocument(wishlistModel, 'Wishlist');
