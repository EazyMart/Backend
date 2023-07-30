const express = require("express");

const router = express.Router();
const {getAllCategories, getCategoryById, addCategory, updateCategory, deleteCategory} = require("../Controllers/categoryController");
const {idValidation} = require("../Middlewares/Validations/idValidation")
const {addCategoryValidation, updateCategoryValidation} = require("../Middlewares/Validations/categoryValidation")
const subCategoryRoute = require("./subCategoryRoute");

//Redirect to subcategory route
router.use("/:categoryId/subcategory", subCategoryRoute);

router.route("/")
    .get(getAllCategories)
    .post(addCategoryValidation, addCategory)

router.route("/:id")
    .all(idValidation)
    .get(getCategoryById)
    .patch(updateCategoryValidation, updateCategory)
    .delete(deleteCategory)


module.exports = router;
