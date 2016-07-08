/**
 * Created by heavenduke on 16-5-17.
 */


var extend = require('./base');
var statusCode = 400;

var default_messages = {
    DATA_VALIDATION_FAILED: "您提交的数据有误，请修改后重新提交",
    HANDLED_FRIEND_APPLICATION: "已处理过的好友请求",
    INVALID_FRIEND_APPLICATION: "非法好友请求",
    EXISTING_FRIEND: "已存在好友关系"
};

var DataValidationFailed = (function (superClass) {
    extend(DataValidationFailed, superClass);
    function DataValidationFailed(message) {
        this.message = message != null ? message : default_messages.DATA_VALIDATION_FAILED;
        this.name = 'DataValidationFailed';
        this.status = statusCode;
        Error.captureStackTrace(this, DataValidationFailed);
    }

    return DataValidationFailed;
})(Error);

var HandledFriendApplication = (function (superClass) {
    extend(HandledFriendApplication, superClass);
    function HandledFriendApplication(message) {
        this.message = message != null ? message : default_messages.HANDLED_FRIEND_APPLICATION;
        this.name = 'HandledFriendApplication';
        this.status = statusCode;
        Error.captureStackTrace(this, HandledFriendApplication);
    }

    return HandledFriendApplication;
})(Error);

var InvalidFriendApplication = (function (superClass) {
    extend(InvalidFriendApplication, superClass);
    function InvalidFriendApplication(message) {
        this.message = message != null ? message : default_messages.INVALID_FRIEND_APPLICATION;
        this.name = 'InvalidFriendApplication';
        this.status = statusCode;
        Error.captureStackTrace(this, InvalidFriendApplication);
    }

    return InvalidFriendApplication;
})(Error);

var ExistingFriend = (function (superClass) {
    extend(ExistingFriend, superClass);
    function ExistingFriend(message) {
        this.message = message != null ? message : default_messages.EXISTING_FRIEND;
        this.name = 'ExistingFriend';
        this.status = statusCode;
        Error.captureStackTrace(this, ExistingFriend);
    }

    return ExistingFriend;
})(Error);

module.exports = {
    DataValidationFailedError: DataValidationFailed,
    HandledFriendApplicationError: HandledFriendApplication,
    InvalidFriendApplicationError: InvalidFriendApplication,
    ExistingFriendError: ExistingFriend
};