const slugify = require("slugify"); // this package to convert A and B => a-and-b
const asyncHandler = require('express-async-handler');
const brandModel = require("../Models/brandModel")
const APIError = require("../Helper/APIError");
const CreateResponse = require("../ResponseObject/responseObject");
const pagination = require("../Helper/pagination");
const updatedFields = require("../Helper/updatedFields");

// @desc    Create All Brands
// @route   GET /brand
// @access  Public
exports.getAllBrands = asyncHandler(async (request, response) => {
    const {page, limit, skip, totalPages} = await pagination(request, await brandModel.countDocuments({}));
    const AllBrands = await brandModel.find({}, {__v: false}).skip(skip).limit(limit);
    response.status(200).json(CreateResponse(true, 'All brands are retrieved successfully', AllBrands, page, limit, totalPages));
})

// @desc    Create Brand by ID
// @route   GET /brand/:id
// @access  Public
exports.getBrandById = asyncHandler(async (request, response, next) => {
    const brand = await brandModel.findById(request.params.id, {__v: false})
    if(!brand) {
        next(new APIError('This brand is not found', 404));
        return;
    }
    response.status(200).json(CreateResponse(true, 'The data of this brand is retrieved successfully', [brand]));
})

// @desc    Create Brand
// @route   POST /Category
// @access  Private
exports.addBrand = asyncHandler(async (request, response) => {
    const Brand = await brandModel.create({name: request.body.name, slug: slugify(request.body.name)});
    response.status(201).json(CreateResponse(true, 'The Brand is added successfully', [Brand]));
})

// @desc    Update Brand
// @route   PATCH /Brand/:id
// @access  Private
exports.updateBrand = asyncHandler(async (request, response, next) => {
    const properties = ["name", "image", "available", "deleted"];
    const targetFields = updatedFields(request, properties);
    if(targetFields.name) {
        targetFields.slug = slugify(targetFields.name);
    }
    const updatedBrand = await brandModel.findOneAndUpdate({_id: request.params.id}, targetFields, {new: true})
    if(!updatedBrand) {
        next(new APIError('This Brand is not found', 404));
        return;
    }
    response.status(200).json(CreateResponse(true, 'This Brand is updated successfully', [updatedBrand]));
})

// @desc    Delete Brand
// @route   DELETE /Brand/:id
// @access  Private
exports.deleteBrand = asyncHandler(async (request, response, next) => {
    const deletedBrand = await brandModel.findOneAndUpdate({_id: request.params.id}, {deleted: true, available: false})
    if(!deletedBrand) {
        next(new APIError('This Brand is not found', 404));
        return;
    }
    response.status(204).json();
})