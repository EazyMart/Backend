const express = require("express");

const router = express.Router();
const {confirmPayment, cancelOrder} = require("../Controllers/webhookController");

router.route("/confirm")
    .post(confirmPayment)

router.route("/cancel")
    .post(cancelOrder)

module.exports = router;
