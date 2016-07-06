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
    var Student = models.student;
    var Assign = models.assignment;
    var Team = models.team;

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
    var init_students = function (student_datas, callback) {
        var student_num = student_datas.length;
        var student_cnt = 0;
        for(var index in student_datas) {
            Student.create(student_datas[index]).then(function (student) {
                if(student) {
                    student_cnt++;
                }
                if (student_cnt >= student_num) {
                    Student.findAll({}).then(function (students) {
                        callback(students);
                    });
                }
            });
        }
    };
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
    var init_resource = function (resource_datas, callback){
        var resource_num = resource_datas.length;
        var resource_cnt = 0;
        for(var index in resource_datas){
            Resource.create(resource_datas[index]).then(function(resource){
                if(resource){
                    resource_cnt++;
                }
                if(resource_cnt >= resource_num){
                    Resource.findAll({}).then(function(resources){
                        callback(resources);
                    });
                }
            });
        }
    };
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

    // 用户数据在./fixtures/teachers.json中，包含三个测试用的用户
    // 三个用户的密码都是123456
    init_teachers(require('./fixtures/teachers'), function (teachers) {
        teachers.forEach(function (teacher) {
            console.log(teacher.dataValues);
        });
    });
    // 用户数据在./fixtures/users.json中，包含三个测试用的用户
    // 三个用户的密码都是123456
    init_students(require('./fixtures/students'), function (students) {
        students.forEach(function (student) {
            //console.log(student.dataValues);
        });
    });
    init_courses(require('./fixtures/courses'), function (courses) {
        courses.forEach(function (course) {
            //console.log(course.dataValues);
        });
    });
    init_assignment(require('./fixtures/assignment'), function (assignments) {
        assignments.forEach(function (assignment) {
            //console.log(assignment.dataValues);
        });
    });
    init_resource(require('./fixtures/resources'),function(resources){
        resources.forEach(function (resource) {
            //console.log(resource.dataValues);
        });
    });
    init_team(require('./fixtures/teams'),function(teams){
        teams.forEach(function (team) {
            //console.log(team.dataValues);
        });
    });

}());