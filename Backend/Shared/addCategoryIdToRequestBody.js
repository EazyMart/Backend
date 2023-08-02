const productModel = require("../Models/productModel");

const addCategoryIdToRequestBody = async (request) => {
    if(!request.body.category) {
        const product = await productModel.findById({_id: request.params.id}, {_id: 0, category: 1});
        request.body.category = product.category
    }
}

module.exports = addCategoryIdToRequestBody