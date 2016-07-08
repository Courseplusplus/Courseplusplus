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
            type:DataTypes.ENUM("SINGLE","TEAM"),
            value:assignment_type(),
            allowNull:false,
            defaultValue:default_assignment_type()
        },
        lesson_id:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        upload_time:{
            type:DataTypes.DATE,
            defaultValue:DataTypes.Now,
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
        },
        assignment_introduction: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                notEmpty: true,
                len: [1, 3000]
            }
        }
    }, {
        underscored: true
    });
};