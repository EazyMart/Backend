const express = require("express");

const router = express.Router();
const {signup, login, changeEmail, changePassword, forgetPassword, verifyResetPasswordCode, resetPassword} = require("../Controllers/authController");
const {addClientRole} = require("../Shared/addClientRole");
const {signupValidation, loginValidation, changeEmailValidation, changePasswordValidation, forgetPasswordValidation, verifyResetPasswordCodeValidation, resetPasswordValidation} = require("../Middlewares/Validations/authValidation");

router.route("/signup")
    .post(addClientRole, signupValidation, signup)

router.route("/login")
    .post(loginValidation, login)

router.route("/changeemail")
    .post(changeEmailValidation, changeEmail)

router.route("/changepassword")
    .post(changePasswordValidation, changePassword)

router.route("/forgetpassword")
    .post(forgetPasswordValidation, forgetPassword)

router.route("/verifyresetpasswordcode")
    .post(verifyResetPasswordCodeValidation, verifyResetPasswordCode)

router.route("/resetpassword")
    .post(resetPasswordValidation, resetPassword)


module.exports = router;
