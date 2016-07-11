(function () {
    var config = require('../../admin_server/config.json');
    //var libs = require('../../lib/');
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
    var Student = models.student;
    var Assign = models.assignment;
    var Team = models.team;
    var Student_Team = models.student_belongsto_team;
    var Term = models.term;

    var init_teachers = function (datas, callback) {
        var num = datas.length;
        var cnt = 0;
        for (var index in datas) {
            //console.log(datas[index]);
            Teacher.create(datas[index]).then(function (item) {
                if (item) {
                    cnt++;
                }
                if (cnt >= num) {
                    Teacher.findAll({}).then(function (items) {
                        callback(items);
                    });
                }
            });
        }
    };
    var init_students = function (student_datas, callback) {
        var student_num = student_datas.length;
        var student_cnt = 0;
        for (var index in student_datas) {
            Student.create(student_datas[index]).then(function (student) {
                if (student) {
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
        for (var index in datas) {
            //console.log(datas[index]);
            Course.create(datas[index]).then(function (item) {

                if (item) {
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
        for (var index in datas) {
            datas[index].upload_time = new Date();
            datas[index].deadline = new Date();
            //console.log(datas[index]);
            Assign.create(datas[index]).then(function (item) {
                if (item) {
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
    var init_teams = function () {
        Team.create({
            "team_name": "team1",
            "course_id": 1,
            "student_id": 13211015
        }).then(function (team) {
            Student.findAll({
                    where: {
                        $or: [{student_id: 13211015},
                            {student_id: 13211015}]
                    }
                }
            ).then(function (students) {
                for (var index in students) {
                    Student_Team.create({
                        "team_id": team.team_id,
                        "student_id": students[index].student_id
                    });
                }
            });
            //team.setStudent()
        });
        Team.create({
            "team_name": "team2",
            "course_id": 1,
            "student_id": 13211016
        }).then(function (team) {
            Student.findAll({
                where: {
                    student_id: 13211016,
                }
            }).then(function (students) {
                for (var index in students) {
                    Student_Team.create({
                        "team_id": team.team_id,
                        "student_id": students[index].student_id
                    });
                }
            });
        });
        Team.create({
            "team_name": "team3",
            "course_id": 1,
            "student_id": 13211018
        }).then(function (team) {
            Student.findAll({
                where: {
                    student_id: 13211018
                }
            }).then(function (students) {
                for (var index in students) {
                    Student_Team.create({
                        "team_id": team.team_id,
                        "student_id": students[index].student_id
                    });
                }
            });
        });
    };
    var init_terms = function (term_datas, callback){
        var term_num = term_datas.length;
        var term_cnt = 0;
        for(var index in term_datas){
            Term.create(term_datas[index]).then(function(term){
                if(term){
                    term_cnt++;
                }
                if(term_cnt >= term_num){
                    Term.findAll({}).then(function(terms){
                        callback(terms);
                    });
                }
            });
        }
    };


    init_teachers(require('./fixtures/teachers'), function (teachers) {
        teachers.forEach(function (teacher) {
            console.log(teacher.dataValues);
        });
    });
    init_students(require('./fixtures/students'), function (students) {
        students.forEach(function (student) {
        //console.log(student.dataValues);
        });
    });
    init_terms(require('./fixtures/terms'),function(terms){
        terms.forEach(function (term) {
            //console.log(team.dataValues);
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

}());