const brandModel = require("../Models/brandModel")
const {getAllDocuments, getDocumentById, addDocument, updateDocument, deleteDocument} = require("./baseController");

// @desc    Create All Brands
// @route   GET /brand
// @access  Public
const searchFields = [];
exports.getAllBrands = getAllDocuments(brandModel, 'Brands', ...searchFields);

// @desc    Create Brand by ID
// @route   GET /brand/:id
// @access  Public
exports.getBrandById = getDocumentById(brandModel, 'Brand');

// @desc    Create Brand
// @route   POST /Category
// @access  Private
exports.addBrand = addDocument(brandModel, 'Brand');

// @desc    Update Brand
// @route   PATCH /Brand/:id
// @access  Private
const properties = ["name", "image", "available", "deleted"];
exports.updateBrand = updateDocument(brandModel, 'Brand', ...properties);

// @desc    Delete Brand
// @route   DELETE /Brand/:id
// @access  Private
exports.deleteBrand = deleteDocument(brandModel, 'Brand');