/**
 * Created by wangzhaoyi on 16/7/3.
 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('course', {
        course_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        course_name:{
            type:DataTypes.STRING(50),
            validate:{
                notEmpty:true,
                len:[1,50]
            }
        },
        introduction: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [1, 3000]
            }
        },
        lesson_total:{
            type:DataTypes.INTEGER,
            allowNull:true,
            defaultValue:1
        },
        img_src:{
            type:DataTypes.STRING,
            allowNull:true,
            defaultValue:"/image/4.png"
        }
    }, {
        underscored: true
    });
};