const express = require("express");

const router = express.Router();
const {getAllCoupons, getCouponById, addCoupon, updateCoupon, deleteCoupon} = require("../Controllers/couponController");
const {idValidation} = require("../Middlewares/idValidation")
const {addCouponValidation, updateCouponValidation} = require("../Middlewares/couponValidation")
const {authontication, authorization} = require("../Services/authService");

router.route("/")
    .all(authontication, authorization("coupons"))
    .get(getAllCoupons)
    .post(addCouponValidation, addCoupon)

router.route("/:id")
    .all(authontication, authorization("coupons"), idValidation)
    .get(getCouponById)
    .patch(updateCouponValidation, updateCoupon)
    .delete(deleteCoupon)


module.exports = router;
