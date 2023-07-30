const { validationResult } = require('express-validator');
const CreateResponse = require("../ResponseObject/responseObject")

// @desc  Finds the validation errors in this request and wraps them in an object with handy functions
const errorValidator = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        response.status(400).json(CreateResponse(false, errors.errors[0].msg));
        return;
    }
    next();
}

module.exports = errorValidator