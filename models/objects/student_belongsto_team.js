/**
 * Created by wangzhaoyi on 16/7/3.
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('student_belongsto_team', {
        student_team_relation:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        team_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        student_id:{
            type:DataTypes.STRING,
            allowNull:false
        },
        accepted:{
            type:DataTypes.ENUM("Accepted","Denied","Not Decided"),
            allowNull:false,
            defaultValue:"Not Decided"
        }
    }, {
        underscored: true
    });
};