const express = require("express");

const router = express.Router();
const {getAllProducts, getProductById, addProduct, updateProduct, deleteProduct} = require("../Controllers/productController");
const {idValidation} = require("../Middlewares/Validations/idValidation")
const {addProductValidation, updateProductValidation} = require("../Middlewares/Validations/productValidation")
const {uploadImageList, toFirebase} = require("../uploadFiles/uploadImage");

const uploadFiles = [{name: "imageCover", maxCount: 1}, {name: "images", maxCount: 5}]

router.route("/")
    .get(getAllProducts)
    .post(uploadImageList(uploadFiles), toFirebase(uploadFiles, "product", "products"), addProductValidation, addProduct)

router.route("/:id")
    .all(idValidation)
    .get(getProductById)
    .patch(uploadImageList(uploadFiles), toFirebase(uploadFiles, "product", "products"), updateProductValidation, updateProduct)
    .delete(deleteProduct)


module.exports = router;
