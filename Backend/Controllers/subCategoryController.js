const slugify = require("slugify"); // this package to convert A and B => a-and-b
const asyncHandler = require('express-async-handler');
const subCategoryModel = require("../Models/subCategory")
const APIError = require("../Helper/APIError");
const CreateResponse = require("../ResponseObject/responseObject");
const pagination = require("../Helper/pagination");
const updatedFields = require("../Helper/updatedFields");

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
exports.getAllSubCategories = asyncHandler(async (request, response) => {
    const {page, limit, skip, totalPages} = await pagination(request, await subCategoryModel.countDocuments({}));
    const AllSubCategories = await subCategoryModel.find({category: request.body.category}, {__v: false}).skip(skip).limit(limit);
    response.status(200).json(CreateResponse(true, 'All SubCategories are retrieved successfully', AllSubCategories, page, limit, totalPages));
})

// @desc    Create Category by ID
// @route   GET /Category/:id
// @access  Public
exports.getSubCategoryById = asyncHandler(async (request, response, next) => {
    const subCategory = await subCategoryModel.findById(request.params.id, {__v: false}).populate({path: "category", select: {name: 1, _id: 0}})
    if(!subCategory) {
        next(new APIError('This subcategory is not found', 404));
        return;
    }
    response.status(200).json(CreateResponse(true, 'The data of this subcategory is retrieved successfully', [subCategory]));
})

// @desc    Create SubCategory
// @route   POST /subcategory
// @access  Private
exports.addSubCategory = asyncHandler(async (request, response) => {
    const subCategory = await subCategoryModel.create({name: request.body.name, slug: slugify(request.body.name), category: request.body.category});
    response.status(201).json(CreateResponse(true, 'The subcategory is added successfully', [subCategory]));
})

// @desc    Update SubCategory
// @route   PATCH /subcategory/:id
// @access  Private
exports.updateSubCategory = asyncHandler(async (request, response, next) => {
    const properties = ["name", "image", "category", "available", "deleted"];
    const targetFields = updatedFields(request, properties);
    if(targetFields.name) {
        targetFields.slug = slugify(targetFields.name);
    }
    const updatedSubCategory = await subCategoryModel.findOneAndUpdate({_id: request.params.id}, targetFields, {new: true})
    if(!updatedSubCategory) {
        next(new APIError('This subcategory is not found', 404));
        return;
    }
    response.status(200).json(CreateResponse(true, 'This subcategory is updated successfully', [updatedSubCategory]));
})

// @desc    Delete SubCategory
// @route   DELETE /subcategory/:id
// @access  Private
exports.deleteSubCategory = asyncHandler(async (request, response, next) => {
    const deletedSubCategory = await subCategoryModel.findOneAndUpdate({_id: request.params.id}, {deleted: true, available: false})
    if(!deletedSubCategory) {
        next(new APIError('This subcategory is not found', 404));
        return;
    }
    response.status(204).json();
})