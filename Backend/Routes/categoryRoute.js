const express = require("express");
const router = express.Router();
const {getAllCategories, getCategoryById, addCategory, updateCategory, deleteCategory} = require("../Controllers/categoryController");
const {idValidation} = require("../Middlewares/Validations/idValidation")
const {addCategoryValidation, updateCategoryValidation} = require("../Middlewares/Validations/categoryValidation")

router.route("/category")
    .get(getAllCategories)
    .post(addCategoryValidation, addCategory)

router.route("/category/:id")
    .all(idValidation)
    .get(getCategoryById)
    .patch(updateCategoryValidation, updateCategory)
    .delete(deleteCategory)


module.exports = router;
