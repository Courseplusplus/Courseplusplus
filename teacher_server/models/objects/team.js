/**
 * Created by wangzhaoyi on 16/7/3.
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('team', {
        team_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        team_name: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [1, 3000]
            }
        },
        leader:{
            type:DataTypes.STRING,
            allowNull:false
        },
        course_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    }, {
        underscored: true
    });
};