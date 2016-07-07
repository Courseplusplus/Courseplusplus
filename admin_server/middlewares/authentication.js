/**
 * Created by Obscurity on 2016/5/13.
 */

var Errors = require('../libs').Errors;

module.exports = function (req, res, next) {
    var validate_access_token = function (current_access_token, created_at, expires_at, uploaded_token) {
        if (current_access_token && created_at && expires_at && uploaded_token) {
            if (current_access_token == uploaded_token) {
                return created_at + parseInt(expires_at) * 1000 >= Date.now();
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };
    var get_session_token = function () {
        if (req.session.user) {
            return req.session.user.access_token;
        }
        return null;
    };
    var get_expires_at = function () {
        if (req.session.user) {
            return req.session.user.expires_at;
        }
        return null;
    };
    var get_created_at = function () {
        if (req.session.user) {
            return req.session.user.created_at;
        }
        return null;
    };
    if (validate_access_token(get_session_token(), get_created_at(), get_expires_at(), req.header("Authorization"))) {
        next();
    }
    else {
        throw new Errors.errors_401.InvalidAccessError();
    }
};