const express = require("express");

const router = express.Router();
const {getAllUsers, getUserById, addUser, updateUser, updateUserRole, blockUser, changeEmail, changePassword, deleteUser} = require("../Controllers/userController");
const {idValidation} = require("../Middlewares/Validations/idValidation")
const {addUserValidation, updateUserValidation, changeEmailValidation, changePasswordValidation} = require("../Middlewares/Validations/userValidation")
const {uploadImageList, toFirebase} = require("../uploadFiles/uploadImage");
const {authontication, authorization, PreventClientRole, checkParamIdEqualTokenId} = require("../Middlewares/authoMiddleware");

const uploadFiles = [{name: "profileImage", maxCount: 1}];

router.route("/")
    .all(authontication, authorization("users"), PreventClientRole)
    .get(getAllUsers)
    .post(addUserValidation, addUser)

router.route("/:id")
    .all(authontication, authorization("users"), idValidation, checkParamIdEqualTokenId)
    .get(getUserById)
    .patch(uploadImageList(uploadFiles), toFirebase(uploadFiles, "user", "users"), updateUserValidation, updateUser)
    .delete(PreventClientRole, deleteUser)

router.route("/:id/changeemail")
    .patch(changeEmailValidation, changeEmail);
    
router.route("/:id/changepassword")
    .patch(changePasswordValidation, changePassword);
    
router.route("/:id/role")
    .patch(authontication, authorization("users"), PreventClientRole, idValidation, updateUserValidation, updateUserRole);

router.route("/:id/block")
    .patch(authontication, authorization("users"), PreventClientRole, idValidation, updateUserValidation, blockUser);

module.exports = router;
