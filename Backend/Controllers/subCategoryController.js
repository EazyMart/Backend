const subCategoryModel = require("../Models/subCategoryModel")
const {getAllDocuments, getDocumentById, addDocument, updateDocument, deleteDocument} = require("./baseController");

// @desc    Set CategoryId To Request Body
// @route   No Route 
// @access  No
exports.setCategoryIdToRequestBody = (request, response, next) => {
    if(!request.body.category) {
        request.body.category = +request.params.categoryId
    }
    next();
}

// @desc    Create All SubCategories for specific category
// @route   GET /subcategory
// @access  Public
const searchFields = [];
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
exports.deleteSubCategory = deleteDocument(subCategoryModel, 'SubCategory');