/**
 * Created by wangzhaoyi on 16/7/3.
 */

var Sequelize = require('sequelize');
var path = require('path');

module.exports = function (database, username, password, config) {
    var sequelize = new Sequelize(database, username, password, config);

    var Assignment = sequelize.import(path.join(__dirname,'objects/assignment'));
    var Submit = sequelize.import(path.join(__dirname,'objects/submit'));
    var Course = sequelize.import(path.join(__dirname,'objects/course'));
    var Resource = sequelize.import(path.join(__dirname,'objects/resource'));
    var Student = sequelize.import(path.join(__dirname,'objects/student'));
    var Teacher = sequelize.import(path.join(__dirname,'objects/teacher'));
    var Team = sequelize.import(path.join(__dirname,'objects/team'));
    var Chat = sequelize.import(path.join(__dirname, 'objects/chat'));

    var Student_Team = sequelize.import(path.join(__dirname,'objects/student_belongsto_team'));
    var Student_Course= sequelize.import(path.join(__dirname,'objects/student_belongsto_course'));
    var Teacher_Course = sequelize.import(path.join(__dirname,'objects/teacher_belongsto_course'));

    Assignment.hasMany(Submit,{foreignKey:"assignment_id"});
    Course.hasMany(Assignment,{foreignKey:"course_id"});
    Course.hasMany(Resource,{foreignKey:"course_id"});
    Course.hasMany(Team,{foreignKey:"course_id"});
    Course.hasMany(Chat,{foreignKey:"course_id"});
    Team.hasMany(Submit,{foreignKey:"team_id"});
    Student.hasMany(Team,{as:"leader",foreignKey:"student_id"});
    Student.hasMany(Chat,{as:"sender_student",foreignKey:"student_id"});
    Teacher.hasMany(Chat,{as:"sender_teacher",foreignKey:"teacher_id"});

    Student.belongsToMany(Team,{through:Student_Team, foreignKey:"student_id"});
    Team.belongsToMany(Student,{through:Student_Team,foreignKey:"team_id"});
    Student.belongsToMany(Course,{through:Student_Course,foreignKey:"student_id"});
    Course.belongsToMany(Student,{through:Student_Course,foreignKey:"course_id"});
    Teacher.belongsToMany(Course,{through:Teacher_Course,foreignKey:"teacher_id"});
    Course.belongsToMany(Teacher,{through:Teacher_Course,foreignKey:"course_id"});

    return sequelize;
};