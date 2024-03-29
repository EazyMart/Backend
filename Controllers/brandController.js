const brandModel = require("../Models/brandModel")
const {getAllDocuments, getDocumentById, addDocument, updateDocument, softDeleteDocument} = require("./Base/baseController");

// @desc    Create All Brands
// @route   GET /brand
// @access  Public
const searchFields = ['name'];
exports.getAllBrands = getAllDocuments(brandModel, 'Brands', ...searchFields);

// @desc    Create Brand by ID
// @route   GET /brand/:id
// @access  Public
exports.getBrandById = getDocumentById(brandModel, 'Brand');

// @desc    Create Brand
// @route   POST /brand
// @access  Private
exports.addBrand = addDocument(brandModel, 'Brand');

// @desc    Update Brand
// @route   PATCH /brand/:id
// @access  Private
const feildsThatAllowToUpdate = ["name", "image", "available", "deleted"];
exports.updateBrand = updateDocument(brandModel, 'Brand', ...feildsThatAllowToUpdate);

// @desc    Delete Brand
// @route   DELETE /brand/:id
// @access  Private
exports.deleteBrand = softDeleteDocument(brandModel, 'Brand');