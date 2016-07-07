/**
 * Created by Obscurity on 2016/4/5.
 */
module.exports = {
    courses:require('./courses/index'),
    teachers:require('./teachers/index'),
    students:require('./students/index'),
    index: function (req, res) {
        res.json({msg:"index of admin server", params:req.params});
    }
};