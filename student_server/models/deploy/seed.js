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
    var Course = models.course;
    var Teacher = models.teacher;
    var Resource = models.resource;

    var init_teachers = function (teacher_datas, callback) {
        var teacher_num = teacher_datas.length;
        var teacher_cnt = 0;
        for(var index in teacher_datas) {
            Teacher.create(teacher_datas[index]).then(function (teacher) {
                if(teacher) {
                    teacher_cnt++;
                }
                if (teacher_cnt >= teacher_num) {
                    teacher.findAll({}).then(function (teachers) {
                        callback(teachers);
                    });
                }
            });
        }
    };
    var init_course = function (course_datas, callback){
        var course_num = course_datas.length;
        var course_cnt = 0;
        for(var index in course_datas){
            Course.create(course_datas[index]).then(function(course){
                if(course){
                    course_cnt++;
                }
                if(course_cnt >= course_num){
                    Course.findAll({}).then(function(courses){
                        callback(courses);
                    });
                }
            });
        }
    };
    var init_resource = function (resource_datas, callback){
        var resource_num = resource_datas.length;
        var resource_cnt = 0;
        for(var index in resource_datas){
            Resource.create(resource_datas[index]).then(function(resource){
                if(resource){
                    resource_cnt++;
                }
                if(resource_cnt >= resource_num){
                    resource.findAll({}).then(function(resources){
                        callback(resources);
                    });
                }
            });
        }
    };


    // 用户数据在./fixtures/teachers.json中，包含三个测试用的用户
    // 三个用户的密码都是123456
    init_teachers(require('./fixtures/teachers'), function (teachers) {
        teachers.forEach(function (teacher) {
            console.log(teacher.dataValues);
        });
    });
    init_course(require('./fixtures/courses'))

}());