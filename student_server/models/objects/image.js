/**
 * Created by Obscurity on 2016/6/13.
 */

module.exports = function (sequelize, DataTypes) {

    return sequelize.define('images', {
        image_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        md5: {
            type: DataTypes.STRING(32),
            allowNull: false
        },
        chat_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        underscored: true
    });
};