const express = require("express");

const {addLoginUserIdToRequestBody, getAllReviews, getReviewById, addReview, updateReview, deleteReview} = require("../Controllers/reviewController");
const {idValidation} = require("../Middlewares/Validations/idValidation");
const {addParentIdToRequestBody, addParentIdToRequestQuery} = require("../Shared/addToRequestBody");
const {addReviewValidation, updateReviewValidation} = require("../Middlewares/Validations/reviewValidation");
const {authontication, authorization, allowClientRole} = require("../Middlewares/authoMiddleware");

const router = express.Router({mergeParams: true});

router.route("/")
    .get(addParentIdToRequestQuery("product", "productId"), getAllReviews)
    .post(authontication, authorization("reviews"), allowClientRole, addParentIdToRequestBody("product", "productId"), addLoginUserIdToRequestBody, addReviewValidation, addReview)

router.route("/:id")
    .all(idValidation)
    .get(getReviewById)
    .patch(authontication, authorization("reviews"), allowClientRole, updateReviewValidation, updateReview)
    .delete(authontication, authorization("reviews"), deleteReview)


module.exports = router;
