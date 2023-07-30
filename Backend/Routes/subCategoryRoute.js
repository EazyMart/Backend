const express = require("express");

const {setCategoryIdToRequestBody, getAllSubCategories, getSubCategoryById, addSubCategory, updateSubCategory, deleteSubCategory} = require("../Controllers/subCategoryController");
const {idValidation} = require("../Middlewares/Validations/idValidation")
const {addSubCategoryValidation, updateSubCategoryValidation} = require("../Middlewares/Validations/subCategoryValidation")

//mergeParams: Allow us to access parameters on the other routers
const router = express.Router({mergeParams: true});

router.route("/")
    .all(setCategoryIdToRequestBody)
    .get(getAllSubCategories)
    .post(addSubCategoryValidation, addSubCategory)

router.route("/:id")
    .all(idValidation)
    .get(getSubCategoryById)
    .patch(updateSubCategoryValidation, updateSubCategory)
    .delete(deleteSubCategory)


module.exports = router;
