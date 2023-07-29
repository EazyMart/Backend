let CreateResponse = function(success, message, result = [], pageNo = 1, itemsNoPerPages = 1, totalPages = 1) {
    return {
        Success: success,
        Message: message,
        PageNo: pageNo,
        ItemsNoPerPages: itemsNoPerPages,
        TotalPages: totalPages,
        Data: result
    }
}
module.exports = CreateResponse;