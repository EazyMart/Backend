const categoryModel = require("../Models/categoryModel")
const {getAllDocuments, getDocumentById, addDocument, updateDocument, deleteDocument} = require("./baseController");

// @desc    Create All Categories
// @route   GET /Category
// @access  Public
const searchFields = [];
exports.getAllCategories = getAllDocuments(categoryModel, 'Categories', ...searchFields);

// @desc    Create Category by ID
// @route   GET /Category/:id
// @access  Public
exports.getCategoryById = getDocumentById(categoryModel, 'Category');

// @desc    Create Category
// @route   POST /Category
// @access  Private
exports.addCategory = addDocument(categoryModel, 'Category');

// @desc    Update Category
// @route   PATCH /Category/:id
// @access  Private
const properties = ["name", "image", "available", "deleted"];
exports.updateCategory = updateDocument(categoryModel, 'Category', ...properties);

// @desc    Delete Category
// @route   DELETE /Category/:id
// @access  Private
exports.deleteCategory = deleteDocument(categoryModel, 'Category');
