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
    console.log(database);
    console.log(models);
    var Student = models.student;
    console.log(Student.create);

    var init_users = function (datas, callback) {
        var num = datas.length;
        var cnt = 0;
        for(var index in datas) {
            Student.create(datas[index]).then(function (item) {
                if(item) {
                    cnt++;
                }
                if (cnt >= num) {
                    Student.findAll({}).then(function (items) {
                        callback(items);
                    });
                }
            });
        }
    };


    // 用户数据在./fixtures/users.json中，包含三个测试用的用户
    // 三个用户的密码都是123456
    init_users(require('./fixtures/students'), function (students) {
        students.forEach(function (student) {
            console.log(student.dataValues);
        });
    });

}());