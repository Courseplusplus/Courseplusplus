/**
 * Created by wangzhaoyi on 16/7/3.
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('teacher', {
        teacher_id: {
            type: DataTypes.STRING(15),
            autoIncrement: false,
            allowNull: false,
            primaryKey: true,
            validate:{
                notEmpty:true,
                len:[1,15]
            }
        },
        name: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [1, 10]
            }
        },
        gender: {//1 for male, 2 for female
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        underscored: true
    });
};
