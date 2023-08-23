const express = require("express");
const {iSWishlistBelongsToTheCurrentUser, AddUserIdFromRequestParamsToRequestQuery, getAllWishlists, addWishlist, deleteWishlist} = require("../Controllers/wishlistController");
const {idValidation} = require("../Middlewares/Validations/idValidation");
const {addLoginUserIdToRequestBody} = require("../Shared/addToRequestBody");
const {addWishlistValidation} = require("../Middlewares/Validations/wishlistValidation");
const {authontication, authorization, allowClientRole, checkParamIdEqualTokenId} = require("../Middlewares/authoMiddleware");

const router = express.Router({mergeParams: true});

router.route("/")
    .all(authontication, authorization("wishlists"), checkParamIdEqualTokenId("userId"))
    .get(AddUserIdFromRequestParamsToRequestQuery, getAllWishlists)
    .post(allowClientRole, addLoginUserIdToRequestBody, addWishlistValidation, addWishlist)

router.route("/:id")
    .delete(idValidation, authontication, authorization("wishlists"), allowClientRole, checkParamIdEqualTokenId("userId"), iSWishlistBelongsToTheCurrentUser, deleteWishlist)

module.exports = router;
