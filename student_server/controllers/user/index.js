/**
 * Created by Obscurity on 2016/5/12.
 */

var PasswordValidator = require('../../libs').PasswordValidator;
var ResultConstructor = require('../../libs').ResultConstructor;
var Errors = require('../../libs').Errors;

exports.index = function (req, res, next) {
    var User = global.db.models.users;
    var offset = req.query.offset ? parseInt(req.query.offset) : 0;
    var limit = req.query.limit ? parseInt(req.query.limit) : 15;
    var parsed_query = function (query) {
        var result = "";
        for (var i = 0; i < query.length; i++) {
            result += "%" + query.charAt(i);
        }
        return result + "%";
    };
    if (req.query.query) {
        User.findAll({
            where: {
                $or: [
                    {
                        telephone: {
                            $like: parsed_query(req.query.query)
                        }
                    }, {
                        username: {
                            $like: parsed_query(req.query.query)
                        }
                    }]
            },
            limit: limit,
            offset: offset
        }).then(function (users) {
            var userList = [];
            users.forEach(function (user) {
                userList.push({
                    user_id: user.user_id,
                    telephone: user.telephone,
                    username: user.username,
                    head_id: user.head_id
                });
            });
            res.json(ResultConstructor.success(userList));
        });
    }
    else {
        res.json(ResultConstructor.success([]));
    }
};

exports.show = function (req, res, next) {
    var User = global.db.models.users;
    if (isNaN(parseInt(req.params.user_id))) {
        next(new Errors.errors_400.DataValidationFailedError("错误的用户ID格式"));
    }
    else {
        var user_id = (parseInt(req.params.user_id) == 0) ? req.session.user.user_id : parseInt(req.params.user_id);
        User.find({where: {user_id: user_id}}).then(function (user) {
            if (user) {
                res.json(ResultConstructor.success({
                    user_id: user.user_id,
                    username: user.username,
                    telephone: user.telephone,
                    head_id: user.head_id,
                    introduction: user.introduction
                }));
            }
            else {
                next(new Errors.errors_404.UserNotFoundError("未找到用户"));
            }
        });
    }
};

exports.create = function (req, res, next) {
    var User = global.db.models.users;
    var userParams = {
        username: req.body.username,
        telephone: req.body.telephone,
        head_id: req.body.head_id,
        password: PasswordValidator.encrypt_password(req.body.password)
    };
    if (PasswordValidator.validate_confirm_password(req.body.password, req.body.confirm_password)) {
        User.create(userParams).then(function (user) {
            if (user) {
                res.json(ResultConstructor.success({
                    user_id: user.user_id,
                    username: user.username,
                    telephone: user.telephone,
                    head_id: user.head_id
                }));
            }
            else {
                next(new Errors.errors_500.InternalServerError());
            }
        }).catch(function () {
            next(new Errors.errors_400.DataValidationFailedError());
        });
    }
    else {
        next(new Errors.errors_400.DataValidationFailedError("两次输入的密码不匹配"));
    }
};

exports.update = function (req, res, next) {
    var User = global.db.models.users;
    User.find({where: {user_id: req.session.user.user_id}}).then(function (user) {
        if (user) {
            var updated_data = {
                telephone: req.body.telephone,
                username: req.body.username,
                head_id: req.body.head_id
            };
            for (var key in updated_data) {
                if (updated_data[key]) {
                    user[key] = updated_data[key];
                }
            }
            return user.save();
        }
        else {
            next(new Errors.errors_404.UserNotFoundError("未找到用户"));
        }
    }).then(function (new_user) {
        res.json(ResultConstructor.success({
            user_id: new_user.user_id,
            username: new_user.username,
            telephone: new_user.telephone,
            head_id: new_user.head_id
        }));
    }).catch(function (err) {
        next(err);
    });
};

exports.session = require('./login');

exports.password = require('./password');