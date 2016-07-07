/**
 * Created by zhangxinru on 16/7/7.
 */
module.exports = {
    index: function(req,res){
        res.json({msg:'router success! 本页面展示所有课程',router:"course.index"});
    }
};