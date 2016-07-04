/**
 * Created by heavenduke on 16-5-13.
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
        sender_teacher: {
            type: DataTypes.STRING,
            allowNull: true
        },
        sender_student:{
            type: DataTypes.STRING,
            allowNull: true
        },
        time_stamp: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue:DataTypes.NOW
        },
        course_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        identity_type:{
            type:DataTypes.ENUM("student","teacher"),
            value:identity_type(),
            defaultValue:default_identity()
        }
    }, {
        underscored: true
    });
};