const express = require("express");

const router = express.Router({mergeParams: true});
const {addUserIdToRequestQueryAtClientRole, getAllOrders, addOrder} = require("../Controllers/orderController");
const {idValidation} = require("../Middlewares/idValidation")
const {addOrderValidation} = require("../Middlewares/orderValidation")
const {authontication, authorization, allowClientRoleOnly} = require("../Services/authService");
const {addLoginUserIdToRequestBody} = require("../Shared/addToRequestBody");

router.route("/")
    .all(authontication, authorization("orders"))
    .get(addUserIdToRequestQueryAtClientRole, getAllOrders)
    .post(allowClientRoleOnly, addLoginUserIdToRequestBody, addOrderValidation, addOrder)

module.exports = router;
