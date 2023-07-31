const mongoose = require("mongoose");
const AutoIncrement = require('../Config/autoIncrementInitialization')

const subCategorySchema = mongoose.Schema(
    {
        _id: {
            type: mongoose.SchemaTypes.Number
        },
        name: {
            type: String,
            lowercase: true,
            trim: true,
            required: [true, 'SubCatgory name is required'],
            unique: [true, 'This subcategory is already found'],
            minlength: [2, 'Too short subcategory name, must be at least 2 characters'],
            maxlength: [32, 'Too long subcategory name, must be at least 32 characters'],
        },
        slug: { // A and B => a-and-b
            type: String,
            lowercase: true        
        },
        image: {
            type: String,
            default: "https://placehold.co/600x400.png"
        },
        category: {
            type: Number,
            ref: "categories",
            required: [true, 'SubCatgory must belong to parent category']
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

subCategorySchema.plugin(AutoIncrement.plugin, {model: 'subCategories', startAt: 1,});

const subCategoryModule = mongoose.model("subCategories", subCategorySchema);

module.exports = subCategoryModule;