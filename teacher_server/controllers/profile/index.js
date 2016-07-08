/**
 * Created by zhangxinru on 16/7/7.
 */

module.exports = {
    index: function(req,res){
        res.json({msg:'router success! 用户个人信息页',router:"profile.index"});
    },
    update:function(req,res){
        res.json({msg:'router success! 用户更新个人信息',router:"profile.update"})
    }
};