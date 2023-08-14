const userModel = require("../Models/userModel");
const {getAllDocuments, getDocumentById, addDocument, updateDocument, deleteDocument} = require("./baseController");

// @desc    Create All users
// @route   GET /User
// @access  Public
const searchFields = ["firstName", "lastName", "email", "mobilePhone", "role"];
exports.getAllUsers = getAllDocuments(userModel, 'Users', ...searchFields);

// @desc    Create User by ID
// @route   GET /User/:id
// @access  Public
exports.getUserById = getDocumentById(userModel, 'User');

// @desc    Signup
// @route   POST /User
// @access  Public
exports.signup = addDocument(userModel, 'User');

// @desc    Update User
// @route   PATCH /User/:id
// @access  Private
const properties = ["firstName", "lastName", "profileImage", "mobilePhone", "role", "available", "deleted"];
exports.updateUser = updateDocument(userModel, 'User', ...properties);

// @desc    Delete User
// @route   DELETE /User/:id
// @access  Private
exports.deleteUser = deleteDocument(userModel, 'User');
