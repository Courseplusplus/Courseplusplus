/**
 * Created by heavenduke on 16-5-13.
 */


module.exports = function (sequelize, DataTypes) {
    return sequelize.define('friends', {
        friend_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        friend_user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        underscored: true
    });
};