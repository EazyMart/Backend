const mongoose = require("mongoose");
const slugify = require("slugify"); // this package to convert A and B => a-and-b
const AutoIncrement = require('@alec016/mongoose-autoincrement');
AutoIncrement.initialize(mongoose.connection)

const categorySchema = mongoose.Schema(
    {
        _id: {
            type: mongoose.SchemaTypes.Number
        },
        name: {
            type: String,
            lowercase: true,
            required: [true, 'Catgory name is required'],
            unique: [true, 'This category is already found'],
            minlength: [3, 'Too short category name'],
            maxlength: [32, 'Too long category name']
        },
        image: {
            type: String,
            default: "https://placehold.co/600x400.png"
        },
        slug: { // A and B => a-and-b
            type: String,
            lowercase: true        
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

categorySchema.plugin(AutoIncrement.plugin, {model: 'categories', startAt: 1,});

// categorySchema.pre('save', function (next) {
//     if (this.isModified('name') || !this.slug) {
//         this.slug = slugify(this.name);
//     }
//     next();
// });

// categorySchema.pre('findOneAndUpdate', function (next) {
//     const { name } = this.getUpdate();
//     if (name) {
//         const slug = slugify(name);
//         this.findOneAndUpdate({}, { $set: { slug } });
//     }
//     next();
// });  

const categoryModule = mongoose.model("categories", categorySchema);

module.exports = categoryModule;