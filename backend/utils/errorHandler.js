

// const ErrorHandler = (message, statusCode) => {
//     const error = new Error(message);
//     // console.log(error);
//     error.statusCode = statusCode;
//     // console.log(error);
//     Error.captureStackTrace(error, ErrorHandler);
//     return error;
// };

// module.exports = ErrorHandler;

// export default ErrorHandler;

class ErrorHandler extends Error {
    constructor(message, statusCode){
        super(message)
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = ErrorHandler;


// function ErrorHandler(message, statusCode) {
//     const error = new Error(message);
//     error.statusCode = statusCode;
//     Error.captureStackTrace(error, ErrorHandler);
//     return error;
// }

// module.exports = ErrorHandler;
