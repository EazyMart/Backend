const express = require("express");

const {setCategoryIdToRequestBody, getAllSubCategories, getSubCategoryById, addSubCategory, updateSubCategory, deleteSubCategory} = require("../Controllers/subCategoryController");
const {idValidation} = require("../Middlewares/Validations/idValidation")
const {addSubCategoryValidation, updateSubCategoryValidation} = require("../Middlewares/Validations/subCategoryValidation")
const {uploadImageList, toFirebase} = require("../uploadFiles/uploadImage");

//mergeParams: Allow us to access parameters on the other routers
const router = express.Router({mergeParams: true});

const uploadFiles = [{name: "image", maxCount: 1}];


router.route("/")
    .all(setCategoryIdToRequestBody)
    .get(getAllSubCategories)
    .post(uploadImageList(uploadFiles), toFirebase(uploadFiles, "subcategory", "subcategories"), addSubCategoryValidation, addSubCategory)

router.route("/:id")
    .all(idValidation)
    .get(getSubCategoryById)
    .patch(uploadImageList(uploadFiles), toFirebase(uploadFiles, "subcategory", "subcategories"), updateSubCategoryValidation, updateSubCategory)
    .delete(deleteSubCategory)


module.exports = router;
