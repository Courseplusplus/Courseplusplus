/**
 * Created by Obscurity on 2016/4/5.
 */

var Sequelize = require('sequelize');
var path = require('path');

module.exports = function (database, username, password, config) {
    var sequelize = new Sequelize(database, username, password, config);

    var Assignment = sequelize.import(path.join(__dirname,'objects/assignment'));
    var Submit = sequelize.import(path.join(__dirname,'objects/assignment'));
    var Course = sequelize.import(path.join(__dirname,'objects/course'));
    var Resource = sequelize.import(path.join(__dirname,'objects/resource'));
    var Student = sequelize.import(path.join(__dirname,'objects/student'));
    var Teacher = sequelize.import(path.join(__dirname,'objects/teacher'));
    var Team = sequelize.import(path.join(__dirname,'objects/team'));
    var Chat = sequelize.import(path.join(__dirname, 'objects/chat'));

    var Student_Team = sequelize.import(path.join(__dirname,'objects/student_belongsto_team'));
    var Student_Course= sequelize.import(path.join(__dirname,'objects/student_belongsto_course'));

    Assignment.hasMany(Submit,{as:"assignment_id",foreignKey:"assignment_id"});
    Course.hasMany(Assignment,{as:"course_id",foreignKey:"course_id"});
    Course.hasMany(Resource,{as:"course_id",foreignKey:"course_id"});
    Course.hasMany(Team,{as:"course_id",foreignKey:"course_id"});
    Course.hasMany(Chat,{as:"course_id",foreignKey:"course_id"});
    Team.hasMany(Submit,{as:"team_id",foreignKey:"team_id"});
    Student.hasMany(Team,{as:"leader",foreignKey:"student_id"});
    //Student.hasMany(Chat,{as:"sender"})

    Student.belongsToMany(Team,{as:"student_id",through:Student_Team, foreignKey:"student_id"});
    Team.belongsToMany(Student,{as:"team_id",through:Student_Team,foreignKey:"team_id"});
    Student.belongsToMany(Course,{as:"student_id",through:Student_Course,foreignKey:"student_id"});
    Course.belongsToMany(Course,{as:"course_id",through:Student_Course,foreighKey:"course_id"});

    return sequelize;
};