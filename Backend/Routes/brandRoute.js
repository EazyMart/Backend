const express = require("express");

const router = express.Router();
const {getAllBrands, getBrandById, addBrand, updateBrand, deleteBrand} = require("../Controllers/brandController");
const {idValidation} = require("../Middlewares/Validations/idValidation")
const {addBrandValidation, updateBrandValidation} = require("../Middlewares/Validations/brandValidation")

router.route("/")
    .get(getAllBrands)
    .post(addBrandValidation, addBrand)

router.route("/:id")
    .all(idValidation)
    .get(getBrandById)
    .patch(updateBrandValidation, updateBrand)
    .delete(deleteBrand)


module.exports = router;
