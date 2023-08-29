const express = require("express");

const router = express.Router({mergeParams: true});
const {addUserIdToRequestQueryAtClientRole, getAllOrders, addOrder} = require("../Controllers/orderController");
const {idValidation} = require("../Middlewares/Validations/idValidation")
const {addOrderValidation} = require("../Middlewares/Validations/orderValidation")
const {authontication, authorization, allowClientRoleOnly} = require("../Middlewares/authoMiddleware");
const {addLoginUserIdToRequestBody} = require("../Shared/addToRequestBody");

router.route("/")
    .all(authontication, authorization("orders"))
    .get(addUserIdToRequestQueryAtClientRole, getAllOrders)
    .post(allowClientRoleOnly, addLoginUserIdToRequestBody, addOrderValidation, addOrder)

router.route("/:id")
    .all(authontication, authorization("orders"), idValidation)
    .get()
    .patch()
    .delete()


module.exports = router;
