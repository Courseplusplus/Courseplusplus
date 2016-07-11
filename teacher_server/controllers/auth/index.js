function validateUser(req){
    return (req.session.hasOwnProperty('user')&&req.session.user.length!=0);
}

module.exports = {
    index:function(req,res,next){
        if(validateUser(req)){
            next()
        }else{
            res.render('login',{params:req.params,session:req.session});
        }
    }
};