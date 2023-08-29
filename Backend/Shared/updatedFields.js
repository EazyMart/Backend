const updatedFields = function(request, feildsThatAllowToUpdate) {
    const targetFields = {};
    // eslint-disable-next-line no-restricted-syntax
    for(const prop of feildsThatAllowToUpdate) {
        if(request.body[prop] !== undefined) {
            targetFields[prop] = request.body[prop];
        }
    }
    return targetFields;
}

module.exports = updatedFields;