let updatedFields = function(request, properties) {
    let targetFields = {}
    for(let prop of properties) {
        if(request.body[prop] != undefined) {
            targetFields[prop] = request.body[prop];
        }
    }
    return targetFields;
}

module.exports = updatedFields;