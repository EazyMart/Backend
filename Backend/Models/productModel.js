const mongoose = require("mongoose");
const AutoIncrement = require('../Config/autoIncrementInitialization')

const productSchema = mongoose.Schema(
    {
        _id: {
            type: mongoose.SchemaTypes.Number
        },
        title: {
            type: String,
            lowercase: true,
            trim: true,
            required: [true, 'Product title is required'],
            unique: [true, 'This product is already found'],
            minlength: [3, 'Too short product title, must be 3 characters at least'],
            maxlength: [50, 'Too long product title, must be 50 characters at most'],
        },
        slug: {
            type: String,
            lowercase: true        
        },
        description: {
            type: String,
            required: [true, 'Any product must have a description'],
            minlength: [20, 'Too short product description, must be 20 characters at least'],
        },
        quantity: {
            type: Number,
            required: [true, 'Any product must have a quantity']
        },
        sold: {
            type: Number,
            default: 0
        },
        price: {
            type: Number,
            required: [true, 'Any product must have a price'],
            min: [0, 'Price must be greater than 10'],
            max: [200000, 'Price must be greater than 10'],
        },
        discount: {
            type: Number,
            default: 0,
            min: [0, 'Discount must be above or equal to 0'],
        },
        colors: {
            type: [String]        
        },
        imageCover: {
            type: String,
            required: [true, 'Any product must have an image']
        },
        images: {
            type: [String],
            required: [true, 'Any product must have one image at least']
        },
        ratingsAverage: {
            type: Number,
            min: [1, 'Rating must be above or equal to 1.0'],
            max: [5, 'Rating must be below or equal to 5.0'],
        },
        ratingsQuantity: {
            type: Number,
            default: 0
        },
        category: {
            type: Number,
            required: [true, 'Any product must belong to a category'],
            ref: 'categories'
        },
        subCategories: {
            type: [Number],
            required: [true, 'Any product must belong to one subcategory at least'],
            ref: 'subCategories'
        },
        brand: {
            type: Number,
            ref: 'brands'
        },
        available: {
            type: Boolean,
            default: true
        },
        deleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
)

productSchema.plugin(AutoIncrement.plugin, {model: 'products', startAt: 1,});

const productModule = mongoose.model("products", productSchema);

module.exports = productModule;