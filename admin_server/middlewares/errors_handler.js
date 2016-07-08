/**
 * Created by heavenduke on 16-5-17.
 */

var ResultConstructor = require('../libs').ResultConstructor;

module.exports = function (err, req, res, next) {
    res.statusCode = err.status;
    res.json(ResultConstructor.fail(err));
};