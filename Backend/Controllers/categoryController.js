const slugify = require("slugify"); // this package to convert A and B => a-and-b
const asyncHandler = require('express-async-handler');
const categoryModel = require("../Models/categoryModel")
const APIError = require("../Helper/APIError");
const CreateResponse = require("../ResponseObject/responseObject");
const pagination = require("../Helper/pagination");
const updatedFields = require("../Helper/updatedFields");

// @desc    Create All Categories
// @route   GET /Category
// @access  Public
exports.getAllCategories = asyncHandler(async (request, response) => {
    const {page, limit, skip, totalPages} = await pagination(request, await categoryModel.countDocuments({}));
    const AllCategories = await categoryModel.find({}, {__v: false}).skip(skip).limit(limit);
    response.status(200).json(CreateResponse(true, 'All Categories are retrieved successfully', AllCategories, page, limit, totalPages));
})

// @desc    Create Category by ID
// @route   GET /Category/:id
// @access  Public
exports.getCategoryById = asyncHandler(async (request, response, next) => {
    const category = await categoryModel.findById(request.params.id, {__v: false})
    if(!category) {
        next(new APIError('This category is not found', 404));
        return;
    }
    response.status(200).json(CreateResponse(true, 'The data of this category is retrieved successfully', [category]));
})

// @desc    Create Category
// @route   POST /Category
// @access  Private
exports.addCategory = asyncHandler(async (request, response) => {
    const category = await categoryModel.create({name: request.body.name, slug: slugify(request.body.name)});
    response.status(201).json(CreateResponse(true, 'The category is added successfully', [category]));
})

// @desc    Update Category
// @route   PATCH /Category/:id
// @access  Private
exports.updateCategory = asyncHandler(async (request, response, next) => {
    const properties = ["name", "image", "available", "deleted"];
    const targetFields = updatedFields(request, properties);
    if(targetFields.name) {
        targetFields.slug = slugify(targetFields.name);
    }
    const updatedCategory = await categoryModel.findOneAndUpdate({_id: request.params.id}, targetFields, {new: true})
    if(!updatedCategory) {
        next(new APIError('This category is not found', 404));
        return;
    }
    response.status(200).json(CreateResponse(true, 'This category is updated successfully', [updatedCategory]));
})

// @desc    Delete Category
// @route   DELETE /Category/:id
// @access  Private
exports.deleteCategory = asyncHandler(async (request, response, next) => {
    const deletedCategory = await categoryModel.findOneAndUpdate({_id: request.params.id}, {deleted: true, available: false})
    if(!deletedCategory) {
        next(new APIError('This category is not found', 404));
        return;
    }
    response.status(204).json();
})
