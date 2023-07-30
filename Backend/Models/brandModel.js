const mongoose = require("mongoose");
const AutoIncrement = require('@alec016/mongoose-autoincrement');

AutoIncrement.initialize(mongoose.connection)

const brandSchema = mongoose.Schema(
    {
        _id: {
            type: mongoose.SchemaTypes.Number
        },
        name: {
            type: String,
            lowercase: true,
            required: [true, 'Brand name is required'],
            unique: [true, 'This brand is already found'],
            minlength: [3, 'Too short brand name, must be 3 characters at least'],
            maxlength: [32, 'Too long brand name, must be 32 characters at most'],
        },
        slug: {
            type: String,
            lowercase: true        
        },
        image: {
            type: String,
            default: "https://placehold.co/600x400.png"
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
brandSchema.plugin(AutoIncrement.plugin, {model: 'brands', startAt: 1,});

const brandModule = mongoose.model("brands", brandSchema);

module.exports = brandModule;