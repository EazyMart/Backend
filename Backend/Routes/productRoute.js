const express = require("express");

const router = express.Router();
const {getAllProducts, getProductById, addProduct, updateProduct, deleteProduct} = require("../Controllers/productController");
const {idValidation} = require("../Middlewares/Validations/idValidation")
const {addProductValidation, updateProductValidation} = require("../Middlewares/Validations/productValidation")
const {uploadImageList, toFirebase} = require("../uploadFiles/uploadImage");
const {authontication, authorization} = require("../Middlewares/authoMiddleware");

const uploadFiles = [{name: "imageCover", maxCount: 1}, {name: "images", maxCount: 5}]

router.route("/")
    .get(getAllProducts)
    .post(authontication, authorization("products"), uploadImageList(uploadFiles), toFirebase(uploadFiles, "product", "products"), addProductValidation, addProduct)

router.route("/:id")
    .all(idValidation)
    .get(getProductById)
    .patch(authontication, authorization("products"), uploadImageList(uploadFiles), toFirebase(uploadFiles, "product", "products"), updateProductValidation, updateProduct)
    .delete(authontication, authorization("products"), deleteProduct)


module.exports = router;
