const express = require("express");

const router = express.Router();
const {signup, login} = require("../Controllers/authController");
const {addClientRole} = require("../Shared/addClientRole");
const {signupValidation, loginValidation} = require("../Middlewares/Validations/authValidation");

router.route("/signup")
    .post(addClientRole, signupValidation, signup)

router.route("/login")
    .post(loginValidation, login)

router.route("/forgetpassword")
    .post(loginValidation, signup)


module.exports = router;
