/**
 * Created by Obscurity on 2016/4/5.
 */
module.exports = {
    index: function (req, res) {
        var Course = global.db.models.course;
        Course.findAll().then(function (courses) {
            res.render('index', {list: courses, params:req.params});
        });
    },
    test:function(req,res){
        res.json({msg:"hello"})
    }
};