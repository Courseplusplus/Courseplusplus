/**
 * Created by Obscurity on 2016/4/5.
 */
module.exports = {
    user: require('./users/index'),
    groups: require('./groups/index'),
    resource:require('./resource/index'),
    courses:require('./courses/index'),
    teachers:require('./teachers/index'),
    students:require('./students/index'),
    index: function (req, res) {
        res.render('index',{title:'软件工程过程',path:'/js/index.js'});
    }
};