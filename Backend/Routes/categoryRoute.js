const express = require("express");

const router = express.Router();
const {getAllCategories, getCategoryById, addCategory, updateCategory, deleteCategory} = require("../Controllers/categoryController");
const {idValidation} = require("../Middlewares/Validations/idValidation")
const {addCategoryValidation, updateCategoryValidation} = require("../Middlewares/Validations/categoryValidation")
const subCategoryRoute = require("./subCategoryRoute");
const {uploadImageList, toFirebase} = require("../uploadFiles/uploadImage");

//Redirect to subcategory route
router.use("/:categoryId/subcategory", subCategoryRoute);

const uploadFiles = [{name: "image", maxCount: 1}];

router.route("/")
    .get(getAllCategories)
    .post(uploadImageList(uploadFiles), toFirebase(uploadFiles, "category", "categories"), addCategoryValidation, addCategory)

router.route("/:id")
    .all(idValidation)
    .get(getCategoryById)
    .patch(uploadImageList(uploadFiles), toFirebase(uploadFiles, "category", "categories"), updateCategoryValidation, updateCategory)
    .delete(deleteCategory)


module.exports = router;
