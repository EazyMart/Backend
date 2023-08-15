const asyncHandler = require("express-async-handler");
require("dotenv").config({path: "config.env"});
const JWT = require("jsonwebtoken");
const APIError = require("../Helper/APIError");
const userModel = require("../Models/userModel")

const authontication = asyncHandler(async (request, response, next) => { 
    if(request.headers.authorization && request.headers.authorization.startsWith("Bearer")) {
        const token = request.headers.authorization.split(" ")[1];
        const decodedPayload = JWT.verify(token, process.env.Secret_Key);
        const user = await userModel.findById(decodedPayload.id, {role: 1, passwordUpdatedTime: 1});
        if(user && user.role.name === decodedPayload.role.name) {
            if(user.passwordUpdatedTime) {
                const passwordUpdatedTimeInSeconds = parseInt(user.passwordUpdatedTime.getTime() / 1000, 10);
                if(passwordUpdatedTimeInSeconds > decodedPayload.iat) {
                    throw new APIError("Unathorized, try to login again", 401);
                }
            }
            request.user = decodedPayload;
            next();
            return;
        }
    }
    throw new APIError("Unathorized, try to login again", 401);
});

const authorization = (modelName) =>
asyncHandler(async (request, response, next) => { 
    const permission = request.method.toLowerCase();
    // eslint-disable-next-line no-restricted-syntax
    for(const allowedModel of request.user.role.allowedModels) {
        if(allowedModel.modelName.toLowerCase() === modelName.toLowerCase() && allowedModel.permissions.includes(permission)) {
            next();
            return;
        }
    }
    // eslint-disable-next-line no-nested-ternary
    throw new APIError(`Not Allowed to ${permission === "post" ? "add" : permission || permission === "patch" ? "update" : permission} ${modelName}`, 403);
});

const PreventClientRole = asyncHandler(async (request, response, next) => { 
    if(request.user.role.name.toLowerCase() === "client") {
        throw new APIError('Not allowed to access this route', 403);
    }
    next();
});

const checkParamIdEqualTokenId = asyncHandler(async (request, response, next) => { 
    if(request.user.role.name.toLowerCase() === "client") {
        if(+request.params.id !== request.user.id) {
            throw new APIError('Not allowed to access this route', 403);
        }
    }
    next();
});

module.exports = {authontication, authorization, PreventClientRole, checkParamIdEqualTokenId};
