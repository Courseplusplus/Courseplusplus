/**
 * Created by heavenduke on 16-5-25.
 */

var authenticator = require('./authentication');

module.exports = function (req, res, next) {
    if (req.body.confirmation_token && req.session.confirmation_token && req.body.confirmation_token == req.session.confirmation_token) {
        next();
    }
    else {
        authenticator(req, res, next);
    }
};