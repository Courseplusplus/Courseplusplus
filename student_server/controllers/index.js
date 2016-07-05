/**
 * Created by Obscurity on 2016/4/5.
 */

module.exports = {
    user: require('./users/index'),
    groups: require('./groups/index'),
    resource:require('./resource/index'),
    submit: require('./submit'),
    assignment: require('./assignment'),
    test: function (req, res) {
        res.json({msg:"hello world"});
    },
    index: function(req,res){
        var Course = global.db.models.course;
        Course.findAll().then(function(courses) {
            res.render('index',{list: courses});
        });
    }
};