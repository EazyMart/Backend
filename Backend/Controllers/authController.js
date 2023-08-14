const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({path: "config.env"});
const APIError = require("../Helper/APIError");
const CreateResponse = require("../ResponseObject/responseObject");
const userModel = require("../Models/userModel");
const {addDocument} = require("./baseController");

// @desc    Signup
// @route   POST /auth/signup
// @access  Public
exports.signup = addDocument(userModel, 'User');

// @desc    Login
// @route   POST /auth/login
// @access  Public
exports.login = asyncHandler(async (request, response, next) => {        
    const user = await userModel.findOne({email: request.body.email}, {__v: 0, available: 0, deleted: 0, createdAt: 0, updatedAt: 0});
    if(user && await bcrypt.compare(request.body.password, user.password)) {
        const token = jwt.sign({id: user._id, role: user.role}, process.env.Secret_Key, {expiresIn: process.env.Expiration_Time});
        response.status(200).json(CreateResponse(true, 'Login successfully', [
            {
                user: {
                    _id: user._id,
                    name: `${user.firstName} ${user.lastName}`,
                    email: user.email,
                    role: user.role.name
                }, 
                token: token,
            }]));
    }
    next(new APIError('Your email or password may be incorrect', 403));
})

// @desc    Change Email
// @route   POST /auth/changeemail
// @access  Public
exports.changeEmail = asyncHandler(async (request, response, next) => {
    const user = await userModel.findOne({email: request.body.currentEmail});
    if(user && await bcrypt.compare(request.body.password, user.password)) {
        const result = user.findOneAndUpdate({_id: user._id}, {email: request.body.newEmail});
        if(result) {
            response.status(200).json(CreateResponse(true, 'Your Email Is changed successfully'));
        }
        next(new APIError('Somewrong occur, please try agian', 500));
    }
    next(new APIError('Your email or password may be incorrect', 401));
})

// @desc    Forget Password
// @route   POST /auth/forgetpassword
// @access  Public
exports.forgetPassword = asyncHandler(async (request, response, next) => {

})

// @desc    Reset Password
// @route   POST /auth/resetpassword
// @access  Private
exports.resetPassword = asyncHandler(async (request, response, next) => {

})
