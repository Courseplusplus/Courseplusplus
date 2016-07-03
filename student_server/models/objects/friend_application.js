/**
 * Created by heavenduke on 16-5-27.
 */

module.exports = function (sequelize, DataTypes) {
    function status_values() {
        return ["waiting", "accepted", "rejected"];
    }

    function default_status_value() {
        return status_values()[0];
    }

    return sequelize.define('friend_applications', {
        friend_application_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        status: {
            type: DataTypes.ENUM,
            values: status_values(),
            defaultValue: default_status_value(),
            allowNull: false
        },
        launcher_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        receiver_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        underscored: true
    });
};