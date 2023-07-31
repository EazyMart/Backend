const express = require("express");

const router = express.Router();
const {getAllProducts, getProductById, addProduct, updateProduct, deleteProduct} = require("../Controllers/productController");
const {idValidation} = require("../Middlewares/Validations/idValidation")
const {addProductValidation, updateProductValidation} = require("../Middlewares/Validations/productValidation")

router.route("/")
    .get(getAllProducts)
    .post(addProductValidation, addProduct)

router.route("/:id")
    .all(idValidation)
    .get(getProductById)
    .patch(updateProductValidation, updateProduct)
    .delete(deleteProduct)


module.exports = router;
