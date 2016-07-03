/**
 * Created by heavenduke on 16-5-13.
 */

module.exports = function (sequelize, DataTypes) {
    function head_values() {
        return ["head_1, head_2", "head_3"];
    }

    function default_head_values() {
        return head_values()[0];
    }

    return sequelize.define('memberships', {
        membership_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        is_owner: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        group_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        underscored: true
    });
};