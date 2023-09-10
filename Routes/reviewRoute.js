const express = require("express");

const {getAllReviews, getReviewById, addReview, updateReview, deleteReview} = require("../Controllers/reviewController");
const {idValidation} = require("../Middlewares/idValidation");
const {addParentIdFromParamToRequestBody, addParentIdFromParamToRequestQuery, addLoginUserIdToRequestBody} = require("../Shared/addToRequestBody");
const {addReviewValidation, updateReviewValidation} = require("../Middlewares/reviewValidation");
const {authontication, authorization, allowClientRoleOnly} = require("../Services/authService");

const router = express.Router({mergeParams: true});

router.route("/")
    .get(addParentIdFromParamToRequestQuery("product", "productId"), getAllReviews)
    .post(authontication, authorization("reviews"), allowClientRoleOnly, addParentIdFromParamToRequestBody("product", "productId"), addLoginUserIdToRequestBody, addReviewValidation, addReview)

router.route("/:id")
    .all(idValidation)
    .get(getReviewById)
    .patch(authontication, authorization("reviews"), allowClientRoleOnly, updateReviewValidation, updateReview)
    .delete(authontication, authorization("reviews"), deleteReview)


module.exports = router;
