/**
 * Created by wangzhaoyi on 16/7/3.
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('student_belongsto_course', {
        student_course_relation:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        course_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        student_id:{
            type:DataTypes.STRING,
            allowNull:false
        }
    }, {
        underscored: true
    });
};