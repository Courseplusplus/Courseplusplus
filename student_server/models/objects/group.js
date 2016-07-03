/**
 * Created by heavenduke on 16-5-13.
 */

module.exports = function (sequelize, DataTypes) {

    return sequelize.define('groups', {
        group_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false,
            defaultValue: ""
        }
    }, {
        underscored: true
    });
};