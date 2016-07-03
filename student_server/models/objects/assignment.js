/**
 * Created by wangzhaoyi on 16/7/3.
 */
module.exports = function (sequelize, DataTypes) {
    function assignment_type(){
        return ["SINGLE","TEAM"];
    }
    function default_assignment_type() {
        return assignment_type()[0];
    }
    return sequelize.define('assignment', {
        assignment_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        assignment_type:{
            type:DataTypes.ENUM,
            value:assignment_type(),
            allowNull:false,
            defaultValue:default_assignment_type()
        },
        course_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        lesson_id:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        upload_time:{
            type:DataTypes.NOW,
            allowNull:false
        },
        deadline:{
            type:DataTypes.DATE,
            allowNUll:false
        },
        file_path:{
            type:DataTypes.STRING(100),
            validate:{
                notEmpty:true,
                len:[1,100]
            }
        }
    }, {
        underscored: true
    });
};