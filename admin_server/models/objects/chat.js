/**
 * Created by wangzhaoyi on 16/7/3.
 */

module.exports = function (sequelize, DataTypes) {
    function identity_id(){
        return ["student","teacher"];
    }
    function default_identity(){
        return identity_id()[0];
    }
    return sequelize.define('chat', {
        chat_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [1, 3000]
            }
        },
        /*sender_teacher: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue:null
        },
        sender_student:{
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue:null
        },*/
        time_stamp: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue:DataTypes.NOW
        },
        identity_type:{
            type:DataTypes.ENUM("student","teacher"),
            value:identity_id(),
            defaultValue:default_identity()
        }
    }, {
        underscored: true
    });
};