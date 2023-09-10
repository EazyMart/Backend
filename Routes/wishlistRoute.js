const express = require("express");
const {iSWishlistBelongsToTheCurrentUser, getAllWishlists, addWishlist, deleteWishlist} = require("../Controllers/wishlistController");
const {idValidation} = require("../Middlewares/idValidation");
const {addLoginUserIdToRequestBody, addParentIdFromParamToRequestQuery} = require("../Shared/addToRequestBody");
const {addWishlistValidation} = require("../Middlewares/wishlistValidation");
const {authontication, authorization, allowClientRoleOnly, checkParamIdEqualTokenId} = require("../Services/authService");

const router = express.Router({mergeParams: true});

router.route("/")
    .all(authontication, authorization("wishlists"), checkParamIdEqualTokenId("userId"))
    .get(addParentIdFromParamToRequestQuery("user", "userId"), getAllWishlists)
    .post(allowClientRoleOnly, addLoginUserIdToRequestBody, addWishlistValidation, addWishlist)

router.route("/:id")
    .delete(idValidation, authontication, authorization("wishlists"), allowClientRoleOnly, checkParamIdEqualTokenId("userId"), iSWishlistBelongsToTheCurrentUser, deleteWishlist)

module.exports = router;
