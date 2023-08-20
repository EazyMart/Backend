const subCategoryModel = require("../Models/subCategoryModel")
const {getAllDocuments, getDocumentById, addDocument, updateDocument, softDeleteDocument} = require("./baseController");

// @desc    Create All SubCategories for specific category
// @route   GET /subcategory
// @access  Public
const searchFields = ['name'];
exports.getAllSubCategories = getAllDocuments(subCategoryModel, 'Subcategories', ...searchFields);

// @desc    Create Category by ID
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
const properties = ["name", "image", "category", "available", "deleted"];
exports.updateSubCategory = updateDocument(subCategoryModel, 'SubCategory', ...properties);

// @desc    Delete SubCategory
// @route   DELETE /subcategory/:id
// @access  Private
exports.deleteSubCategory = softDeleteDocument(subCategoryModel, 'SubCategory');