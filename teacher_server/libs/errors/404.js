/**
 * Created by heavenduke on 16-5-17.
 */

var extend = require('./base');

var statusCode = 404;

var default_messages = {
    USER_NOT_FOUND: "用户不存在",
    GROUP_NOT_FOUND: "讨论组不存在",
    FRIEND_NOT_FOUND: "好友关系不存在",
    MEMBERSHIP_NOT_FOUND: "讨论组成员关系不存在"
};

var UserNotFound = (function (superClass) {
    extend(UserNotFound, superClass);
    function UserNotFound(message) {
        this.message = message != null ? message : default_messages.USER_NOT_FOUND;
        this.name = 'UserNotFound';
        this.status = statusCode;
        Error.captureStackTrace(this, UserNotFound);
    }

    return UserNotFound;
})(Error);

var GroupNotFound = (function (superClass) {
    extend(GroupNotFound, superClass);
    function GroupNotFound(message) {
        this.message = message != null ? message : default_messages.GROUP_NOT_FOUND;
        this.name = 'GroupNotFound';
        this.status = statusCode;
        Error.captureStackTrace(this, GroupNotFound);
    }

    return GroupNotFound;
})(Error);

var FriendNotFound = (function (superClass) {
    extend(FriendNotFound, superClass);
    function FriendNotFound(message) {
        this.message = FriendNotFound != null ? message : default_messages.FRIEND_NOT_FOUND;
        this.name = 'FriendNotFound';
        this.status = statusCode;
        Error.captureStackTrace(this, FriendNotFound);
    }

    return FriendNotFound;
})(Error);

var MembershipNotFound = (function (superClass) {
    extend(MembershipNotFound, superClass);
    function MembershipNotFound(message) {
        this.message = MembershipNotFound != null ? message : default_messages.MEMBERSHIP_NOT_FOUND;
        this.name = 'FriendNotFound';
        this.status = statusCode;
        Error.captureStackTrace(this, MembershipNotFound);
    }

    return MembershipNotFound;
})(Error);


module.exports = {
    UserNotFoundError: UserNotFound,
    GroupNotFoundError: GroupNotFound,
    FriendNotFoundError: FriendNotFound,
    MembershipNotFoundError: MembershipNotFound
};