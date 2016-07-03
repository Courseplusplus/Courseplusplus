/**
 * Created by wangzhaoyi on 16/7/3.
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('resource', {
        resource_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        resource_type:{
            type:DataTypes.INTEGER,//1 for ppt, 2 for video, 3 for other
            allowNull:false,
            defaultValue:1,
            validate:{

            }
        },
        resource_name:{
            type:DataTypes.STRING(50),
            validate:{
                notEmpty:true,
                len:[1,50]
            }
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