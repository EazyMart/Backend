const subCategoryModel = require("../Models/subCategoryModel")
const {getAllDocuments, getDocumentById, addDocument, updateDocument, softDeleteDocument} = require("./Base/baseController");

// @desc    Get All SubCategories for specific category
// @route   GET /subcategory
// @access  Public
const searchFields = ['name'];
exports.getAllSubCategories = getAllDocuments(subCategoryModel, 'Subcategories', ...searchFields);

// @desc    Get Category by ID
// @route   GET /Category/:id
// @access  Public
exports.getSubCategoryById = getDocumentById(subCategoryModel, 'Subcategory');

// @desc    Create SubCategory
// @route   POST /subcategory
// @access  Private
exports.addSubCategory = addDocument(subCategoryModel, 'Subcategory');

// @desc    Update SubCategory
// @route   PATCH /subcategory/:id
// @access  Private
const feildsThatAllowToUpdate = ["name", "image", "category", "available", "deleted"];
exports.updateSubCategory = updateDocument(subCategoryModel, 'SubCategory', ...feildsThatAllowToUpdate);

// @desc    Delete SubCategory
// @route   DELETE /subcategory/:id
// @access  Private
exports.deleteSubCategory = softDeleteDocument(subCategoryModel, 'SubCategory');