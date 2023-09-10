const express = require("express");

const router = express.Router();
const {confirmPayment} = require("../Controllers/webhookController");

router.route("/confirm")
    .post(confirmPayment)

module.exports = router;
