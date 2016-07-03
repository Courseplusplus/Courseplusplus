/**
 * Created by wangzhaoyi on 16/7/3.
 */
module.exports = function (sequelize, DataTypes) {
    function resource_type(){
        return ["PPT", "VIDEO", "OTHER"];
    }
    function default_resource_type() {
        return resource_type()[0];
    }
    return sequelize.define('resource', {
        resource_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        resource_type:{
            type:DataTypes.ENUM,
            value:resource_type(),
            allowNull:false,
            defaultValue:default_resource_type()
        },
        course_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        lession:{
            type:DataTypes.INTEGER,
            allowNull:true
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