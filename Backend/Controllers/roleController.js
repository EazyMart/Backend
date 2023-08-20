const roleModel = require("../Models/roleModel")
const {getAllDocuments, getDocumentById, addDocument, updateDocument, softDeleteDocument} = require("./baseController");

// @desc    Create All Categories
// @route   GET /role
// @access  Private
const searchFields = ['name'];
exports.getAllRoles = getAllDocuments(roleModel, 'Roles', ...searchFields);

// @desc    Create role by ID
// @route   GET /role/:id
// @access  Private
exports.getroleById = getDocumentById(roleModel, 'Role');

// @desc    Create role
// @route   POST /role
// @access  Private
exports.addrole = addDocument(roleModel, 'Role');

// @desc    Update role
// @route   PATCH /role/:id
// @access  Private
const properties = ["name", "allowedModels", "available", "deleted"];
exports.updaterole = updateDocument(roleModel, 'Role', ...properties);

// @desc    Delete role
// @route   DELETE /role/:id
// @access  Private
exports.deleterole = softDeleteDocument(roleModel, 'Role');
