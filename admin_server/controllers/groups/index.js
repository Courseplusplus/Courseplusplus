/**
 * Created by Obscurity on 2016/5/12.
 */
var ResultConstructor = require('../../libs').ResultConstructor;
var Errors = require('../../libs').Errors;

exports.index = function (req, res, next) {
    var User = global.db.models.users;
    var current_user_id = req.session.user.user_id;
    User.find({where: {user_id: current_user_id}}).then(function (user) {
        return user.getGroups({attributes: ["group_id", "name"]});
    }).then(function (groups) {
        res.json(ResultConstructor.success(groups));
    }).catch(function (err) {
        next(err);
    });
};

exports.show = function (req, res, next) {
    var Group = global.db.models.groups;
    var group_id = req.params.group_id;
    Group.find({where: {group_id: group_id}}).then(function (group) {
        if (group) {
            res.json(ResultConstructor.success({
                group_id: group.group_id,
                name: group.name
            }));
        }
        else {
            next(new Errors.errors_404.GroupNotFoundError("未找到小组"));
        }
    }).catch(function (err) {
        next(err);
    });
};

exports.update = function (req, res, next) {
    var Group = global.db.models.groups;
    var group_id = req.params.group_id;
    Group.find({where: {group_id: group_id}}).then(function (group) {
        if (group) {
            group.name = req.body.name;
            if (req.body.name) {
                group.save().then(function (updated_group) {
                    res.json(ResultConstructor.success({
                        group_id: updated_group.group_id,
                        name: updated_group.name
                    }));
                }).catch(function (err) {
                    next(err);
                });
            } else {
                next(new Errors.errors_404.GroupNotFoundError("未找到mingzi"));
            }
        } else {
            next(new Errors.errors_404.GroupNotFoundError("未找到小组"));
        }
    }).catch(function (err) {
        next(err);
    });
};

exports.create = function (req, res, next) {
    var Group = global.db.models.groups;
    var User = global.db.models.users;
    var Membership = global.db.models.memberships;
    var current_user_id = req.session.user.user_id;
    var group_members = req.body.members;
    var current_group;
    var groupParams = {
        name: req.body.name
    };
    group_members.push(current_user_id);
    Group.create(groupParams).then(function (group) {
        current_group = group;
        return User.findAll({where: {user_id: {$in: group_members}}});
    }).then(function (users) {
        return current_group.addUsers(users);
    }).then(function () {
        return Group.find({
            where: {
                group_id: current_group.group_id
            },
            include: [{
                model: User
            }]
        })
    }).then(function (group) {
        if (!group.name) {
            var default_group_name = "";
            for (var i = 0; i < Math.min(group.users.length, 10); i++) {
                default_group_name += group.users[i].username;
                if (i != Math.min(group.users.length, 10) - 1) {
                    default_group_name += ", ";
                }
            }
            group.name = default_group_name.substring(0, 30);
        }
        return group.save();
    }).then(function (new_group) {
        res.json(ResultConstructor.success({
            group_id: current_group.group_id,
            name: current_group.name
        }));
    }).catch(function (err) {
        next(err);
    });

};

exports.memberships = require('./memberships/index');