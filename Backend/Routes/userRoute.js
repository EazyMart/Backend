const express = require("express");

const router = express.Router();
const {getAllUsers, getUserById, signup, updateUser, deleteUser} = require("../Controllers/userController");
const {idValidation} = require("../Middlewares/Validations/idValidation")
const {addUserValidation, updateUserValidation} = require("../Middlewares/Validations/userValidation")
const {uploadImageList, toFirebase} = require("../uploadFiles/uploadImage");

const uploadFiles = [{name: "profileImage", maxCount: 1}];

router.route("/")
    .get(getAllUsers)
    .post(addUserValidation, signup)

router.route("/:id")
    .all(idValidation)
    .get(getUserById)
    .patch(updateUserValidation, updateUser)
    .delete(deleteUser)


module.exports = router;
