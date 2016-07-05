/**
 * Created by Obscurity on 2016/4/5.
 */


module.exports = {
    user: require('./users/index'),
    groups: require('./groups/index'),
    resource:require('./resource/index'),
    test: function (req, res) {
        res.json({"message": "hello world"});
    }
};