const express = require("express");

const router = express.Router();
const {getAllUsers, getUserById, signup, updateUser, deleteUser} = require("../Controllers/userController");
const {idValidation} = require("../Middlewares/Validations/idValidation")
const {addUserValidation, updateUserValidation} = require("../Middlewares/Validations/userValidation")
const {uploadImageList, toFirebase} = require("../uploadFiles/uploadImage");

const roleModel = require("../Models/roleModel");

const uploadFiles = [{name: "profileImage", maxCount: 1}];

router.route("/")
    .get(getAllUsers)
    .post(async (request, resposne, next) => {
        const ClientRoleId = await roleModel.findOne({slug: "client"}, {_id: 1});
        request.body.role = ClientRoleId._id;
        next();
    }, addUserValidation, signup)

router.route("/:id")
    .all(idValidation)
    .get(getUserById)
    .patch(updateUserValidation, updateUser)
    .delete(deleteUser)


module.exports = router;
