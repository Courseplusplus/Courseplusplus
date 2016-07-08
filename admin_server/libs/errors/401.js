/**
 * Created by heavenduke on 16-5-17.
 */

var extend = require('./base');

var statusCode = 401;

var default_messages = {
    INVALID_ACCESS: "非法访问",
    INVALID_LOGIN: "您提交的手机号或密码有误，请重新输入",
    INVALID_REFRESH_TOKEN: "授权更新码无效",
    INCORRECT_OTP_CODE: "验证码错误",
    INVALID_MEMBERSHIP: "您不属于该讨论组或您和该用户不是好友关系",
    INVALID_FRIEND: "您和对方还不是好友关系"
};

var InvalidAccess = (function (superClass) {
    extend(InvalidAccess, superClass);
    function InvalidAccess(message) {
        this.message = message != null ? message : default_messages.INVALID_ACCESS;
        this.name = 'InvalidAccess';
        this.status = statusCode;
        Error.captureStackTrace(this, InvalidAccess);
    }

    return InvalidAccess;
})(Error);

var InvalidLogin = (function (superClass) {
    extend(InvalidLogin, superClass);
    function InvalidLogin(message) {
        this.message = message != null ? message : default_messages.INVALID_LOGIN;
        this.name = 'InvalidLogin';
        this.status = statusCode;
        Error.captureStackTrace(this, InvalidLogin);
    }

    return InvalidLogin;
})(Error);

var InvalidRefreshToken = (function (superClass) {
    extend(InvalidRefreshToken, superClass);
    function InvalidRefreshToken(message) {
        this.message = message != null ? message : default_messages.INVALID_REFRESH_TOKEN;
        this.name = 'InvalidRefreshToken';
        this.status = statusCode;
        Error.captureStackTrace(this, InvalidRefreshToken);
    }

    return InvalidRefreshToken;
})(Error);

var InvalidMembership = (function (superClass) {
    extend(InvalidMembership, superClass);
    function InvalidMembership(message) {
        this.message = message != null ? message : default_messages.INVALID_MEMBERSHIP;
        this.name = 'InvalidMembership';
        this.status = statusCode;
        Error.captureStackTrace(this, InvalidMembership);
    }

    return InvalidMembership;
})(Error);

var IncorrectOtpCode = (function (superClass) {
    extend(IncorrectOtpCode, superClass);
    function IncorrectOtpCode(message) {
        this.message = message != null ? message : default_messages.INCORRECT_OTP_CODE;
        this.name = 'IncorrectOtpCode';
        this.status = statusCode;
        Error.captureStackTrace(this, IncorrectOtpCode);
    }

    return IncorrectOtpCode;
})(Error);

var InvalidFriend = (function (superClass) {
    extend(InvalidFriend, superClass);
    function InvalidFriend(message) {
        this.message = message != null ? message : default_messages.INVALID_FRIEND;
        this.name = 'InvalidFriend';
        this.status = statusCode;
        Error.captureStackTrace(this, InvalidFriend);
    }

    return InvalidFriend;
})(Error);

module.exports = {
    InvalidAccessError: InvalidAccess,
    InvalidLoginError: InvalidLogin,
    InvalidRefreshTokenError: InvalidRefreshToken,
    InvalidMembershipError: InvalidMembership,
    IncorrectOtpCodeError: IncorrectOtpCode,
    InvalidFriendError: InvalidFriend
};