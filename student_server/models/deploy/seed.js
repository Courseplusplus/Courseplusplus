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
    var Student = models.student;
    var Course = models.course;
    var Assign = models.assignment;
    var Team = models.team;

    var init_courses = function (datas, callback) {
        var num = datas.length;
        var cnt = 0;
        for(var index in datas) {
            datas[index].term=new Date();
            //console.log(datas[index]);
            Course.create(datas[index]).then(function (item) {

                if(item) {
                    cnt++;
                }
                if (cnt >= num) {
                    Course.findAll({}).then(function (items) {
                        callback(items);
                    });
                }
            });
        }
    };

    init_courses(require('./fixtures/courses'), function (courses) {
        courses.forEach(function (course) {
            //console.log(course.dataValues);
        });
    });

    var init_assignment = function (datas, callback) {
        var num = datas.length;
        var cnt = 0;
        for(var index in datas) {
            datas[index].upload_time=new Date();
            datas[index].deadline=new Date();
            //console.log(datas[index]);
            Assign.create(datas[index]).then(function (item) {
                if(item) {
                    cnt++;
                }
                if (cnt >= num) {
                    Assign.findAll({}).then(function (items) {
                        callback(items);
                    });
                }
            });
        }
    };

    init_assignment(require('./fixtures/assignment'), function (assignments) {
        assignments.forEach(function (assignment) {
            //console.log(assignment.dataValues);
        });
    });

    var init_students = function (datas, callback) {
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
    init_students(require('./fixtures/students'), function (students) {
        students.forEach(function (student) {
            //console.log(student.dataValues);
        });
    });

    var init_teams = function() {
        Team.create({
            "team_name": "team1",
            "course_id": 1,
            "student_id": 13211014}).then(function(team){
            Student.findAll({
                where: {
                    $or: [{student_id: 13211014},
                        {student_id: 13211015}]
                }
            }
            ).then(function(students){
                team.setStudents(students);
            });
            //team.setStudent()
        });
        Team.create({
            "team_name": "team2",
            "course_id": 2,
            "student_id": 13211016}).then(function(team){
            Student.find({where: {student_id: 13211014}}).then(function(student){
                team.setStudents([student]);
            });
        });
    };

    init_teams();

}());