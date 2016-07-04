/**
 * Created by Obscurity on 2016/5/12.
 */
var Errors = require('../../../libs').Errors;
var ResultConstructor = require('../../../libs').ResultConstructor;

//查看讨论组成员
exports.index = function (req, res, next) {
    var group_id = req.params.group_id;
    var Group = global.db.models.groups;
    var User = global.db.models.users;

    Group.find({
        where: {
            group_id: group_id
        },
        include: [{
            model: User
        }]
    }).then(function (group) {
        if (!group) {
            throw new Errors.errors_404.GroupNotFoundError();
        }
        var result_params = [];
        group.users.forEach(function (user) {
            result_params.push({
                membership_id: user.memberships.membership_id,
                user_id: user.user_id,
                telephone: user.telephone,
                username: user.username,
                head_id: user.head_id
            });
        });
        res.json(ResultConstructor.success(result_params));
    }).catch(function (err) {
        next(err);
    });
};

//邀请别人进讨论组
exports.create = function (req, res, next) {

    function filterArray(array1, users) {
        var result = [];
        var tempObj = {};
        for(var i in array1) {
            tempObj[i] = 1;
        }
        for(var i in users) {
            if(tempObj[users[i].user_id]) {
                tempObj = 2;
            }
        }
        for(var i in array1) {
            if(tempObj[i] == 1) {
                result.push(i);
            }
        }
        return result;
    }

    var Group = global.db.models.groups;
    var User = global.db.models.users;
    var members = req.body.members;
    var group_id = req.params.group_id;
    var current_group;

    Group.find({
        where: {
            group_id: group_id
        },
        include: [{
            model: User
        }]
    }).then(function (group) {
        if (!group) {
            throw new Errors.errors_404.GroupNotFoundError();
        }
        current_group = group;
        return User.find({where: {user_id: {$in: filterArray(members, group.users)}}});
    }).then(function (users) {
        return current_group.addUsers(users);
    }).then(function () {
        res.json(ResultConstructor.success());
    }).catch(function (err) {
        next(err);
    });
};
//退出讨论组d
exports.destroy = function (req, res, next) {
    var Membership = global.db.models.memberships;
    var Group = global.db.models.groups;
    var membership_id = req.params.membership_id;
    var User = global.db.models.users;
    var group_id = req.params.group_id;
    var current_user_id = req.session.user.user_id;

    Membership.find({where: {membership_id: membership_id}}).then(function (membership) {
        if (!membership) {
            throw new Errors.errors_404.MembershipNotFoundError();
        }
        else if (membership.group_id != group_id || membership.user_id != current_user_id) {
            throw new Errors.errors_401.InvalidMembershipError("非法退出操作");
        }
        return membership.destroy();
    }).then(function () {
        return Group.find({
            where: {
                group_id: group_id
            },
            include: [{
                model: User
            }]
        });
    }).then(function (group) {
        if (!group.users || group.users.length == 0) {
            return group.destroy();
        }
        else {
            return group.save();
        }
    }).then(function () {
        res.json(ResultConstructor.success());
    }).catch(function (err) {
        next(err);
    });
};