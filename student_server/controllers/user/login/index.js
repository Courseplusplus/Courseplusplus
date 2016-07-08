/**
 * Created by Obscurity on 2016/5/12.
 */

var PasswordValidator = require('../../../libs').PasswordValidator; // 封装了密码的校验、解码与编码
var ResultConstructor = require('../../../libs').ResultConstructor; // 用于封装返回结果
var TokenValidator = require('../../../libs').TokenValidator;  // 用于校验访问授权码
var Errors = require('../../../libs').Errors; // 封装了各种各样的错误

exports.index = function(req,res){
    res.render('login');
};

// 用户登录接口：
//TODO: 完成
// req对应http request
// res对应http response
// next为中间件链条上的下一节点
exports.create = function (req, res, next) {

    // global.db.models封装了各种数据表，这里使用users表
    var User = global.db.models.student;
    // 把上传的数据存放在一个变量里面
    // 上传的数据位于req.body里面，依照API获取，这里获取的字段为telephone
    var userParams = {
        student_id: req.body.student_id
    };
    // 依照sequelize这一npm包从数据库中查询数据，查询结果在向then函数传递的回调函数中
    User.find({where: userParams}).then(function (user) {
        // user是查询结果
        // 如果为空说明查无此人，出错
        // 如果不为空则要更进一步校验密码是否匹配
        if (user) {
            // 这里调用PasswordValidator中封装的is_password_valid去校验
            if (PasswordValidator.is_password_valid(user.password, req.body.password)) {
                // 把一部分数据写入session中，方便其他接口调用
                req.session.user = {
                    student_id: user.student_id,  // 用于识别当前用户
                    access_token: TokenValidator.construct_access_token(), // 调用TokenValidator中的方法去生成access_token
                    created_at: Date.now(),  // 用于后面的接口校验
                    expires_at: 7200   // 用于后面的接口校验
                };
                user.refresh_token = TokenValidator.construct_refresh_token();  // 调用TokenValidator中的方法去生成refresh_token
                return user.save();
            }
            else {
                // 用户密码不匹配，抛出错误给下一层中间件，这里的InvalidLoginError对应非法登录
                throw new Errors.errors_401.InvalidLoginError();
            }
        }
        else {
            // 没有找到用户，抛出错误给下一层中间件，这里的InvalidLoginError对应非法登录
            throw new Errors.errors_401.InvalidLoginError();
        }
    }).then(function (new_user) {
        // 这里封装一下返回结果，可以看到json的结构与api文档是一致的
        var resultParams = {
            access_token: req.session.user.access_token,
            refresh_token: new_user.refresh_token,
            created_at: req.session.user.created_at,
            expires_at: req.session.user.expires_at
        };
        // 302 jump
        res.writeHead(302, {
            'Location': '/'
        });
        res.end();
    }).catch(function (err) {
        // 若出现任何其他错误，则抛出错误给下一层中间件，这里的catch函数用来接收在数据库操作中出现的错误
        // err变量为异常对象，传递给下一层中间件去做错误处理
        next(err);
    });
};


// 更新用户信息（不包括密码）
// todo: 完成
exports.update = function (req, res, next) {
    var refresh_token = req.body.refresh_token;
    console.log(refresh_token);
    var User = global.db.models.users;
    User.find({where: {refresh_token: refresh_token}}).then(function (user) {
        if (user) {
            req.session.user = {
                user_id: user.user_id,
                access_token: TokenValidator.construct_access_token(),
                created_at: Date.now(),
                expires_at: 7200
            };
            user.refresh_token = TokenValidator.construct_refresh_token();
            return user.save();
        }
        else {
            throw new Errors.errors_401.InvalidRefreshTokenError();
        }
    }).then(function (new_user) {
        var resultParams = {
            access_token: req.session.user.access_token,
            refresh_token: new_user.refresh_token,
            created_at: req.session.user.created_at,
            expires_at: req.session.user.expires_at
        };
        res.json(ResultConstructor.success(resultParams));
    }).catch(function (err) {
        next(err);
    });
};