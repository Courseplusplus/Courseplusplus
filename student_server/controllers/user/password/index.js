/**
 * Created by heavenduke on 16-5-25.
 */

var PasswordValidator = require('../../../libs').PasswordValidator;
var Errors = require('../../../libs').Errors;
var ResultConstructor = require('../../../libs').ResultConstructor;

// 修改密码（完成）
exports.update = function (req, res, next) {
    var User = global.db.models.users;
    var query = null;
    if (req.session.telephone) {
        query = {where: {telephone: req.session.telephone}};
    }
    else if (req.session.user && req.session.user.user_id) {
        query = {where: {user_id: req.session.user.user_id}};
    }
    else {
        query = {where: {user_id: 0}};
    }
    User.find(query).then(function (user) {
        if (req.session.confirmation_token) {
            if (req.body.new_password && req.body.confirm_password) {
                if (PasswordValidator.validate_confirm_password(req.body.new_password, req.body.confirm_password)) {
                    user.password = PasswordValidator.encrypt_password(req.body.new_password);
                    delete req.session.confirmation_token;
                    delete req.session.telephone;
                    return user.save();
                }
                else {
                    next(new Errors.errors_400.DataValidationFailedError("两次输入的密码不一致"));
                }
            }
            else {
                next(new Errors.errors_400.DataValidationFailedError("密码有关信息不完整"));
            }
        }
        else {
            if (req.body.previous_password && req.body.new_password && req.body.confirm_password) {
                if (PasswordValidator.is_password_valid(user.password, req.body.previous_password)) {
                    if (PasswordValidator.validate_confirm_password(req.body.new_password, req.body.confirm_password)) {
                        user.password = PasswordValidator.encrypt_password(req.body.new_password);
                        return user.save();
                    }
                    else {
                        next(new Errors.errors_400.DataValidationFailedError("两次输入的密码不一致"));
                    }
                }
                else {
                    next(new Errors.errors_400.DataValidationFailedError("原密码错误"));
                }
            }
            else {
                next(new Errors.errors_400.DataValidationFailedError("密码有关信息不完整"));
            }
        }
    }).then(function () {
        res.json(ResultConstructor.success());
    }).catch(function (err) {
        next(err);
    });
};