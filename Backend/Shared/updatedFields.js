const updatedFields = function(request, properties) {
    const targetFields = {};
    // eslint-disable-next-line no-restricted-syntax
    for(const prop of properties) {
        if(request.body[prop] !== undefined) {
            targetFields[prop] = request.body[prop];
        }
    }
    return targetFields;
}

module.exports = updatedFields;