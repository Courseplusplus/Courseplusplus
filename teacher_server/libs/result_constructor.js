/**
 * Created by heavenduke on 16-5-17.
 */

var ResultConstructor = {};

ResultConstructor.success = function (data) {
    return {
        message: "success",
        data: data
    };
};

ResultConstructor.fail = function (error) {
    return {
        message: error.message
    };
};

module.exports = ResultConstructor;