const express = require("express");

const router = express.Router();
const {getAllRoles, getroleById, addrole, updaterole, deleterole} = require("../Controllers/roleController");
const {idValidation} = require("../Middlewares/Validations/idValidation")
const {addRoleValidation, updateRoleValidation} = require("../Middlewares/Validations/roleValidation")
const {authontication, authorization} = require("../Middlewares/authoMiddleware");

router.route("/")
    .all(authontication, authorization("roles"))
    .get(getAllRoles)
    .post(addRoleValidation, addrole)

router.route("/:id")
    .all(authontication, authorization("roles"), idValidation)
    .get(getroleById)
    .patch(updateRoleValidation, updaterole)
    .delete(deleterole)


module.exports = router;
