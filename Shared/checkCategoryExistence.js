const categoryModel = require("../Models/categoryModel");

const checkCategoryExistence = async (...categoriesId) => {
    const categories = await categoryModel.find({_id: {$in: categoriesId}}, {_id: 1});
    if(categories.length === categoriesId.length) {
        return {success: true, notFoundCategories: []};
    }
    const foundCategories = categories.map(category => category._id);
    const notFoundCategories = categoriesId.filter((element) => foundCategories.includes(element));
    return {success: false, notFoundCategories};
}

module.exports = checkCategoryExistence