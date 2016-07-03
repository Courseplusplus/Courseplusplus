/**
 * Created by heavenduke on 16-5-13.
 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('chats', {
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
        group_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        sender_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        receiver_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        received_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        underscored: true
    });
};