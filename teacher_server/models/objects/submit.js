/**
 * Created by wangzhaoyi on 16/7/3.
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('submit', {
        submit_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        assignment_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        team_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        submitter_id:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        submit_time:{
            type:DataTypes.DATE,
            allowNull:false
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