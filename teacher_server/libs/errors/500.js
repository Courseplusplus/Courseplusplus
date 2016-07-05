/**
 * Created by heavenduke on 16-5-17.
 */

var extend = require('./base');

var statusCode = 500;

var default_messages = {
    UNKNOWN: "系统异常"
};

var InternalServerError = (function (superClass) {
    extend(InternalServerError, superClass);
    function InternalServerError(message) {
        this.message = message != null ? message : default_messages.UNKNOWN;
        this.name = 'InternalServerError';
        this.status = statusCode;
        Error.captureStackTrace(this, InternalServerError);
    }

    return InternalServerError;
})(Error);

module.exports = {
    InternalServerError: InternalServerError
};