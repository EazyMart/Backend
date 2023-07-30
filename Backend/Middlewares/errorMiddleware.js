const globalError = (error, request, response, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';

    if(process.env.NODE_ENV == "development") {
        sendErrorForDev(error, response);
    }
    else {
        sendErrorForProd(error, response);
    }
}

const sendErrorForDev = (error, response) => {
    return response.status(error.statusCode).json({
        status: error.status,
        error: error,
        message: error.message,
        stack: error.stack
    });
}

const sendErrorForProd = (error, response) => {
    return response.status(error.statusCode).json({
        status: error.status,
        message: error.message,
    });
}

module.exports = globalError;