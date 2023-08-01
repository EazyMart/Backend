const slugify = require("slugify"); // this package to convert A and B => a-and-b
const asyncHandler = require('express-async-handler');
const productModel = require("../Models/productModel")
const APIError = require("../Helper/APIError");
const CreateResponse = require("../ResponseObject/responseObject");
const updatedFields = require("../Shared/updatedFields");
const {filter, select, sort, pagination} = require("../Shared/queryRequest");

// @desc    Create All Products
// @route   GET /product
// @access  Public
exports.getAllProducts = asyncHandler(async (request, response) => {
    const filtedFields = filter(request, 'title', 'description');
    const {page, limit, skip, totalPages} = await pagination(request, await productModel.countDocuments(filtedFields));
    const AllProducts = await productModel.find(filtedFields, select(request)).skip(skip).limit(limit).sort(sort(request));
    response.status(200).json(CreateResponse(true, 'All Products are retrieved successfully', AllProducts, page, limit, totalPages));
})

// @desc    Create Product by ID
// @route   GET /Product/:id
// @access  Public
exports.getProductById = asyncHandler(async (request, response, next) => {
    const product = await productModel.findById(request.params.id, select(request))
    if(!product) {
        next(new APIError('This Product is not found', 404));
        return;
    }
    response.status(200).json(CreateResponse(true, 'The data of this Product is retrieved successfully', [product]));
})

// @desc    Create Product
// @route   POST /Product
// @access  Private
exports.addProduct = asyncHandler(async (request, response) => {
    request.body.slug = slugify(request.body.title);
    const product = await productModel.create(request.body);
    response.status(201).json(CreateResponse(true, 'The Product is added successfully', [product]));
})

// @desc    Update Product
// @route   PATCH /Product/:id
// @access  Private
exports.updateProduct = asyncHandler(async (request, response, next) => {
    const properties = ["title", "description", "quantity", "sold", "price", "discount", "colors", "imageCover", "images", "ratingsAverage", "ratingsQuantity", "category", "subCategories", "brand", "available", "deleted"];
    const targetFields = updatedFields(request, properties);
    if(targetFields.name) {
        targetFields.slug = slugify(targetFields.name);
    }
    const updatedProduct = await productModel.findOneAndUpdate({_id: request.params.id}, targetFields, {new: true})
    if(!updatedProduct) {
        next(new APIError('This Product is not found', 404));
        return;
    }
    response.status(200).json(CreateResponse(true, 'This Product is updated successfully', [updatedProduct]));
})

// @desc    Delete Product
// @route   DELETE /Product/:id
// @access  Private
exports.deleteProduct = asyncHandler(async (request, response, next) => {
    const deletedProduct = await productModel.findOneAndUpdate({_id: request.params.id}, {deleted: true, available: false})
    if(!deletedProduct) {
        next(new APIError('This Product is not found', 404));
        return;
    }
    response.status(204).json();
})
