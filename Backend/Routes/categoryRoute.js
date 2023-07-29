const express = require("express");
const router = express.Router();
const {getAllCategories, getCategoryById, addCategory, updateCategory, deleteCategory} = require("../Controllers/categoryController");
// const validator = require("../Middlewares/errorValidator");
// const authenticatioMW = require("../Middlewares/authentication");

router.route("/category")
    .get(getAllCategories)
    .post(addCategory)

router.route("/category/:id")
    .get(getCategoryById)
    .post(updateCategory)
    .delete(deleteCategory)


module.exports = router;
