/**
 * Created by heavenduke on 16-6-12.
 */

(function () {
    var config = require('../../config.json');
    var libs = require('../../libs');
    var database = require('../')(
        config.mysql.database,
        config.mysql.username,
        config.mysql.password,
        config.mysql.config
    );

    database.sync();

    var models = database.models;
    var User = models.users;
    var Group = models.groups;
    var chats = models.chats;

    var init_users = function (user_datas, callback) {
        var user_num = user_datas.length;
        var user_cnt = 0;
        for(var index in user_datas) {
            User.create(user_datas[index]).then(function (user) {
                if(user) {
                    user_cnt++;
                }
                if (user_cnt >= user_num) {
                    User.findAll({}).then(function (users) {
                        callback(users);
                    });
                }
            });
        }
    };


    // 用户数据在./fixtures/users.json中，包含三个测试用的用户
    // 三个用户的密码都是123456
    init_users(require('./fixtures/users'), function (users) {
        users.forEach(function (user) {
            console.log(user.dataValues);
        });
    });

}());