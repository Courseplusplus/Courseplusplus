/**
 * Created by heavenduke on 16-4-13.
 */

module.exports = function (req, res, next) {
    console.log("session: " + JSON.stringify(req.session));
    console.log("params: " + JSON.stringify(req.params));
    console.log("body: " + JSON.stringify(req.body));
    next();
};