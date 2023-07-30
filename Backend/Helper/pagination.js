const pagination = async function(request, documentCount) {
    const {page = 1, limit = 3} = request.query;
    return {
        page: +page,
        limit: +limit,
        skip: (+page - 1) * +limit,
        totalPages: Math.ceil(documentCount / +limit)
    }
}

module.exports = pagination;