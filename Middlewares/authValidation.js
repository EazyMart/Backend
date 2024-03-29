const {check} = require("express-validator");
const errorExpressValidatorHandler = require("../ErrorHandler/errorExpressValidatorHandler");
const roleModel = require("../Models/roleModel");

exports.signupValidation = [
	check("firstName")
		.notEmpty().withMessage("Firstname is required")
		.isString().withMessage("Firstname must be string")
		.isLength({min: 3}).withMessage("Too short firstname, 3 characters at least")
		.isLength({max: 32}).withMessage("Too long firstname, 32 characters at most")
		.matches(/^[a-zA-Z]+$/g).withMessage("Firstname must contain only characters"),

	check("lastName")
		.notEmpty().withMessage("Lastname is required")
		.isString().withMessage("Lastname must be string")
		.isLength({min: 3}).withMessage("Too short lastname, 3 characters at least")
		.isLength({max: 32}).withMessage("Too long lastname, 32 characters at most")
		.matches(/^[a-zA-Z]+$/g).withMessage("Lastname must contain only characters"),

	check("email")
		.notEmpty().withMessage("Email is required")
		.matches(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/).withMessage("Invalid email"),

    check("password")
		.notEmpty().withMessage("Password is required")
		.matches(/^(?=.*[!@#$%^&*()])(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/).withMessage("Password must contain upper, lower characters, numbers and special characters"),
    
	check("profileImage")
		.optional()
		.isURL().withMessage("Invalid Photo"),

	check("mobilePhone")
		.optional()
		.isMobilePhone("any").withMessage("Invalid Mobile Phone"),

	errorExpressValidatorHandler
]

exports.loginValidation = [
	check("email")
		.notEmpty().withMessage("Email is required")
		.matches(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/).withMessage("Invalid email"),

    check("password")
		.notEmpty().withMessage("Password is required"),

	errorExpressValidatorHandler
]

exports.forgetPasswordValidation = [
	check("email")
		.notEmpty().withMessage("Email is required")
		.matches(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/).withMessage("Invalid email"),

	errorExpressValidatorHandler
]

exports.verifyResetPasswordCodeValidation = [
	check("email")
		.notEmpty().withMessage("Email is required")
		.matches(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/).withMessage("Invalid email"),

	check("code")
		.notEmpty().withMessage("Reset Code is required")
		.isInt().withMessage("Reset Code must be an integer number")
		.custom(value => {
			if(value.toString().length !== 6) {
				throw new Error("Invalid code")
			}
			return true
		}),

	errorExpressValidatorHandler
]

exports.resetPasswordValidation = [
	check("email")
		.notEmpty().withMessage("Email is required")
		.matches(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/).withMessage("Invalid email"),

	check("newPassword")
		.notEmpty().withMessage("New Password is required")
		.matches(/^(?=.*[!@#$%^&*()])(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/).withMessage("Password must contain upper, lower characters, numbers and special characters"),

	errorExpressValidatorHandler
]